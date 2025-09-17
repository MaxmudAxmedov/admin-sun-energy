import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export const Header = () => {
  return( 
  <header className="py-7"> 
  <div>
    lorem 
    <Button>D</Button>
    <Button>L</Button>
  </div>
<div className=" flex gap-2 items-center">
    <Input placeholder={"search..."}/>
    <Button>send</Button>
</div>
  </header>
)
};
