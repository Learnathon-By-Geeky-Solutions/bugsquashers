"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../pages/auth/Firebase"
import { ShoppingCart, Menu, Search, Camera, User } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Nav = () => {
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <nav className="fixed top-0 w-full py-4 px-4 md:px-8 lg:px-32 flex items-center justify-between z-50 bg-background/80 backdrop-blur-md">
      {/* Logo */}
      <h1 className="text-3xl font-black text-white ">
        FAIRBASKET<span className="text-primary">.</span>
      </h1>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex justify-between items-center space-x-6">
        <div className="">
          <a className="hover:text-accent" href="./">
            Home
          </a>
        </div>
        <div className="">
          <a className="hover:text-accent" href="./">
            Market
          </a>
        </div>
        {/* Products Dropdown */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-accent">Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a href="./" className="block p-6 bg-gradient-to-b from-muted/50 to-muted rounded-md">
                        <div className="mb-2 mt-4 text-lg font-medium">Featured Products</div>
                        <p className="text-sm text-muted-foreground">Check out our latest items</p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {[
                    { name: "Electronics", link: "/categories/electronics" },
                    { name: "Clothing", link: "/categories/clothing" },
                    { name: "Home & Garden", link: "/categories/home" },
                  ].map(({ name, link }) => (
                    <li key={name}>
                      <NavigationMenuLink asChild>
                        <a href={link}>{name}</a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-64 bg-muted"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Icons */}
        <Button variant="outline" size="icon" aria-label="Camera">
          <Camera className="h-5 w-5" />
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span>Cart</span>
        </Button>

        {/* Authentication */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user.photoURL || "/placeholder-avatar.jpg"} alt={user.displayName || "User"} />
                  <AvatarFallback>
                    {user.displayName ? user.displayName[0] : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => navigate("/login")} variant="default">
            Sign In
          </Button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center space-x-4">
        <Button variant="outline" size="icon" aria-label="Camera">
          <Camera className="h-5 w-5" />
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <div className="flex-1 py-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full mb-4"
                />
                <nav className="space-y-4">
                  {["Products", "About", "Contact"].map((item) => (
                    <Link key={item} to={`/${item.toLowerCase()}`} className="block py-2 hover:underline">
                      {item}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="border-t pt-4">
                <Button variant="outline" className="w-full mb-2">
                  <ShoppingCart className="h-5 w-5 mr-2" /> Cart
                </Button>
                {user ? (
                  <>
                    <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full mb-2">
                      Dashboard
                    </Button>
                    <Button onClick={handleLogout} variant="destructive" className="w-full">
                      Log out
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => navigate("/login")} variant="default" className="w-full">
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Nav

