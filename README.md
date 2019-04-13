# Ark
This is a personal passion project of mine. The idea of how frameworks work always interested me, so yeah... I'm building one myself to gain a deep understanding and also because I get a lot of enjoyment out of it. This is my venture into building a modern, light weight framework. 

As of right now, the current release has an almost complete lexing phase. The structure of the code could be improved, but as of right now I'm just hacking away to get the mvp out. The parsing phase is currently being iterated on. 

So far, the lexer can correctly tokenize a basic JSX format:
  const hello = <div>
    <h1>Hello, World!</h1>
    HELLO, WORLD!
    <p>hello, world!</p>
  </div>;
  
With newlines and spaces between elements. But no element attributes.
