---
title: Rust NIFs in Elixir
date: '2021-01-24T22:57:30.739Z'
tags:
- zettel
- zettelkasten
---
Originally from: [Rust NIFs in Elixir](https://hambly.dev/rust-nifs-in-elixir)

Elixir is a dynamic, strongly typed, functional programming language that runs on the Erlang virtual machine - the BEAM. It inherits that distributed and fault-tolerant architecture, while adding a Ruby-like syntax, modern build tool and package manager Mix, and a built-in testing framework. It really sparks joy every time I get to use it!

Given its trade-offs for scalability and managed memory, when you require better CPU and memory performance it’s necessary to reach for Native Implemented Functions. NIFs allow you to call functions from compiled, shared libraries directly in your Elixir/Erlang code. However, a native function that crashes or misbehaves can crash the whole VM or cause scheduling and memory consumption issues.
Rustler is a library for writing NIFs in Rust, giving us better safety from undefined behavior, out-of-bounds access, use-after-free bugs, null pointer dereferences, and data races. All of which can have disasterous consequences on the Erlang VM.

Discord wrote a great article where they used Rust NIFs to scale their Elixir service. They created a sorted “Member List” data structure that’s very fast to process mutations in the list, and returns the indices where items in the list are mutated. They released that work as an open source library called Discord.SortedSet.

There are some brilliant quality of life improvements landing in Rustler 0.22, so let’s learn how to use Rustler to create a NIF module in Elixir!

Start off by installing Elixir and Rust.
Open a terminal and your favorite text editor or IDE.
Create a new Mix application

```
mix new my_app && cd my_app
```

Edit mix.exs to add Rustler as a dependency.

```elixir
# mix.exs
defp deps do
  [
    {:rustler, github: "rusterlium/rustler", 
      ref: "e343b8ca", sparse: "rustler_mix"}
  ]
end
```

Here we are importing the dependency directly from GitHub, to get the latest changes coming in the next version of Rustler! The ref key is the git commit hash, and sparse indicates that the Elixir dependency is in a specific folder of the repository.
Install the dependency

```
mix deps.get
```

Create a new NIF using Rustler - use MyNif as the module name, and mynif for the Rust crate name

```
mix rustler.new
```

This is the name of the Elixir module the NIF module will be registered to.
Module name > MyNif
This is the name used for the generated Rust crate. The default is most likely fine.

```
Library name (mynif) >
* creating native/mynif/.cargo/config
* creating native/mynif/README.md
* creating native/mynif/Cargo.toml
* creating native/mynif/src/lib.rs
```

Ready to go! See my_app/native/mynif/README.md for further instructions.
Follow the instructions in the readme to update mix.exs by adding :rustler to the project compilers, and mynif to the rustler crates

```elixir
# mix.exs
def project do
  [
    # ...
    compilers: [:rustler] ++ Mix.compilers(),
    rustler_crates: [mynif: []]
  ]
end
```

Now update the Rustler dependency in native/mynif/Cargo.toml, using the rev key to specify the same git revision

```toml
# Cargo.toml
[dependencies]
rustler = { git = "https://github.com/rusterlium/rustler", 
            rev = "e343b8ca"}
```

Now we can compile! This will download our Rust deps, compile the crate, and compile our Elixir code
mix compile
Take a look at native/mynif/src/lib.rs where the auto generated add function is defined and exported to the Elixir.MyNif module

```rust
#[rustler::nif]
fn add(a: i64, b: i64) -> i64 {
    a + b
}

rustler::init!("Elixir.MyNif", [add]);
```

To use our NIF from Elixir, we need to create the MyNif module in lib/my_nif.ex

```elixir
defmodule MyNif do
  use Rustler, otp_app: :my_app, crate: "mynif"

  # When your NIF is loaded, it will override this function.
  def add(_a, _b), do: :erlang.nif_error(:nif_not_loaded)
end
```

Now let’s create a test for it!

```elixir
# test/my_nif_test.exs
defmodule MyNifTest do
  use ExUnit.Case

  test "adds using NIF" do
    assert MyNif.add(300, 120) == 420
  end
end
```

And run the tests

```
mix test
...

Finished in 0.03 seconds
1 doctest, 2 tests, 0 failures
```

Now let’s do something more interesting by trying to crash the Erlang VM. Update lib.rs with a panic function, and add it to the list of exported functions

```rust
// lib.rs
// ...

#[rustler::nif]
fn panic() {
    panic!("Boom!")
}

rustler::init!("Elixir.MyNif", [add, panic]);
```

Add the declaration to the MyNif Elixir module

```elixir
# lib/my_nif.ex
# ...

def panic(), do: :erlang.nif_error(:nif_not_loaded)
```

Fire up an IEx console and let’s see what happens

```
iex -S mix

iex(1)> MyNif.panic()
thread '<unnamed>' panicked at 'Boom!', src/lib.rs:8:5

** (ErlangError) Erlang error: :nif_panicked
    (my_app 0.1.0) MyNif.panic()

iex(1)>
```

Our IEx console is still running! This is part of the safety provided by using Rust for our NIFs, even if our NIF panics, Rustler wraps it up nicely in an ErlangError which we can use to either catch the exception, or just let it crash and restart the process!
Okay so let’s really crash the VM! Create and export another function in lib.rs

```rust
// lib.rs
// ...

#[rustler::nif]
fn crash() {
    // create a null pointer
    let p: *const i32 = std::ptr::null();
    // https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html
    unsafe {
        // dereferencing a raw pointer can only be done in an unsafe block
        // but dereferencing a NULL pointer is undefined behavior!
        // and likely to cause a segmentation fault and program crash
        println!("{:?}", *p);
    }
}

rustler::init!("Elixir.MyNif", [add, panic, crash]);
```

Don’t forget to add the declaration to the MyNif Elixir module

```elixir
# lib/my_nif.ex
# ...

def crash(), do: :erlang.nif_error(:nif_not_loaded)
```

Start IEx again and run the crash function..

```
iex -S mix

iex(1)> MyNif.crash()

user@host:my_app$
```

There we go! We completely crashed the Erlang VM and process supervisor, killing the IEx session and dumping us back into the terminal.
Of course this is not what you want your NIF to be doing, which is why it’s useful to write these in Rust instead of C - hopefully catching these kinds of issues before they happen.
Performance
Let’s see the performance difference in action, by generating and sorting random numbers.
To generate random numbers in Elixir, use the Erlang :rand module. Add this function in the MyApp module

```elixir
# lib/my_app.ex
def generate(num, upper) do
  1..num
  |> Enum.map(fn _ -> :rand.uniform(upper) end)
end
```

To do the same thing in Rust, we’ll depend on the Rand crate. Add the dependency in Cargo.toml

```toml
[dependencies]
# ...
rand = "0.7.3"
```

Then create and export our new function in lib.

```rust
#[rustler::nif]
fn generate(num: i64, upper: i64) -> Vec<i64> {
    extern crate rand;
    use rand::Rng;

    let mut rng = rand::thread_rng();

    // rust ranges are "half open"
    // so (0..5) has a length of 5
    // https://doc.rust-lang.org/std/ops/struct.Range.html
    (0..num)
        .map(|_| {
            // gen_range includes the lower bound
            // but excludes the upper bound
            // so we add 1 to upper to match the elixir implementation
            // https://docs.rs/rand/0.7.3/rand/trait.Rng.html
            rng.gen_range(1, upper + 1)
        })
        .collect()
}

rustler::init!("Elixir.MyNif", [add, panic, crash, generate]);
```

And load it in the MyNif module

```elixir
# lib/my_nif.ex
# ...

def generate(_num, _upper), do: :erlang.nif_error(:nif_not_loaded)
```

Now let’s time these functions using the Erlang :timer module, in a new file timing.exs

```elixir
# timing.exs

{microseconds, _} = :timer.tc(MyApp, :generate, [1_000_000, 1_000_000])
IO.puts("MyApp.generate #{microseconds / 1_000_000} seconds")

{microseconds, _} = :timer.tc(MyApp, :generate, [10_000_000, 1_000_000])
IO.puts("MyApp.generate #{microseconds / 1_000_000} seconds")

{microseconds, _} = :timer.tc(MyApp, :generate, [30_000_000, 1_000_000])
IO.puts("MyApp.generate #{microseconds / 1_000_000} seconds")


{microseconds, _} = :timer.tc(MyNif, :generate, [1_000_000, 1_000_000])
IO.puts("MyNif.generate #{microseconds / 1_000_000} seconds")

{microseconds, _} = :timer.tc(MyNif, :generate, [10_000_000, 1_000_000])
IO.puts("MyNif.generate #{microseconds / 1_000_000} seconds")

{microseconds, _} = :timer.tc(MyNif, :generate, [30_000_000, 1_000_000])
IO.puts("MyNif.generate #{microseconds / 1_000_000} seconds")
```

Run the script

```
mix run timing.exs

MyApp.generate 0.375 seconds
MyApp.generate 3.875 seconds
MyApp.generate 11.063 seconds

MyNif.generate 0.047 seconds
MyNif.generate 0.328 seconds
MyNif.generate 1.39 seconds
```

The results are far from scientific, but we can see that the NIF is roughly 10x faster in this example.
We have generated random integers, let’s see what happens when we sort them!
For Elixir, we’ll use Enum.sort - which uses the Erlang :lists module under the hood.
To implement our Rust sort, create and export the following function in lib.rs where we use the sort method on Vec structs in the standard library

```rust
#[rustler::nif]
fn sort(ints: Vec<i64>) -> Vec<i64> {
    let mut copy = ints.clone();
    copy.sort();

    copy
}

rustler::init!("Elixir.MyNif", [add, panic, crash, generate, sort]);
```

Load the function in MyNif

```elixir
# my_nif.ex
# ...

def sort(ints), do: :erlang.nif_error(:nif_not_loaded)
```

Now update our timing script to sort our generated lists

```elixir
{_, ints1} = :timer.tc(MyNif, :generate, [1_000_000, 1_000_000])
{_, ints2} = :timer.tc(MyNif, :generate, [10_000_000, 1_000_000])
{_, ints3} = :timer.tc(MyNif, :generate, [30_000_000, 1_000_000])

{microseconds, _} = :timer.tc(Enum, :sort, [ints1])
IO.puts("Enum.sort #{microseconds / 1_000_000} seconds")
{microseconds, _} = :timer.tc(Enum, :sort, [ints2])
IO.puts("Enum.sort #{microseconds / 1_000_000} seconds")
{microseconds, _} = :timer.tc(Enum, :sort, [ints3])
IO.puts("Enum.sort #{microseconds / 1_000_000} seconds")

{microseconds, _} = :timer.tc(MyNif, :sort, [ints1])
IO.puts("MyNif.sort  #{microseconds / 1_000_000} seconds")
{microseconds, _} = :timer.tc(MyNif, :sort, [ints2])
IO.puts("MyNif.sort  #{microseconds / 1_000_000} seconds")
{microseconds, _} = :timer.tc(MyNif, :sort, [ints3])
IO.puts("MyNif.sort  #{microseconds / 1_000_000} seconds")
```

And let’s take a look!

```
mix run timing.exs

Enum.sort 0.328 seconds
Enum.sort 6.156 seconds
Enum.sort 21.656 seconds

MyNif.sort  0.125 seconds
MyNif.sort  1.438 seconds
MyNif.sort  4.75 seconds
```

For the given lists, the NIF appears to be roughly 3 to 5 times as fast. Below is a comparison where I also generated and sorted 50 million and 100 million items.

### Conclusion
Elixir is an excellent language for building distributed and fault-tolerant applications. Like most dynamic and memory-managed languages, it trades some performance for ease of use and reliability.
When maximum performance is required, it’s possible to call Native Implemented Functions from Elixir. Rustler allows the use of Rust for these native functions, giving us stronger safety guarantees against issues that could affect the reliability of the application.