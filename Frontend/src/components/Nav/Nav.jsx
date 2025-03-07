import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use Link for internal navigation
import { signOut } from "firebase/auth";
import { auth } from "../../pages/auth/Firebase";
import {
  ShoppingCart,
  Menu,
  Search,
  Camera,
  User,
  Moon,
  Sun,
   Package, LogOut,Settings  
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PropTypes from "prop-types";
import { useAuth } from "../../pages/auth/Authcontext";

// Constants for repeated values
const NAV_ITEMS = ["Products", "About", "Contact"];
const CATEGORIES = [
  { name: "Electronics", link: "/categories/electronics" },
  { name: "Clothing", link: "/categories/clothing" },
  { name: "Home & Garden", link: "/categories/home" },
];

// ThemeToggle component to switch between dark and light mode
const ThemeToggle = ({ showText = false }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
    variant="outline"
    size="icon"
      className={`flex items-center justify-center gap-2 p-2 bg-transparent hover:bg-accent rounded-full hover:text-secondary-foreground ${
        showText ? "w-full" : ""
      }`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      {showText && <span>{theme === "light" ? "Dark" : "Light"}</span>}
    </Button>
  );
};

ThemeToggle.propTypes = {
  showText: PropTypes.bool,
};

// Shared prop types for DesktopNavigation and MobileNavigation
const navigationPropTypes = {
  user: PropTypes.object,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleDashboardClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

// MobileNavigation component for smaller screens
const MobileNavigation = ({
  user,
  search,
  setSearch,
  navigate,
  handleLogout,
  handleDashboardClick,
  loading,
}) => {
  return (
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
          <div className="flex flex-col h-full py-8">
            <div className="flex-1 py-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-4"
              />
              <nav className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="block py-2 hover:underline"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t pt-4">
              {/* Dark Mode Toggle inside Mobile Nav */}
              <div className="pb-2">
                <ThemeToggle showText={true} />
              </div>

              <Button
                variant="outline"
                className="w-full mb-2 bg-secondary"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> Cart
              </Button>
              {user ? (
                <>
                  <Button
                    onClick={handleDashboardClick}
                    variant="outline"
                    className="w-full mb-2 bg-secondary"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Dashboard"}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  variant="default"
                  className="w-full"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

MobileNavigation.propTypes = navigationPropTypes;

// DesktopNavigation component for larger screens
const DesktopNavigation = ({
  user,
  search,
  setSearch,
  navigate,
  handleLogout,
  handleDashboardClick,
  loading,
}) => {
  return (
    <div className="hidden lg:flex justify-between items-center space-x-6 text-white">
      <div>
        <Link to="/">
          Home
        </Link>
      </div>
      <div>
        <Link to="/market">
          Market
        </Link>
      </div>
      {/* Products Dropdown */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent className="text-muted-foreground">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className="block p-6 bg-gradient-to-b from-muted/50 to-muted rounded-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Featured Products
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Check out our latest items
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {CATEGORIES.map(({ name, link }) => (
                  <li key={name}>
                    <NavigationMenuLink asChild>
                      <Link to={link}>{name}</Link>
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
        <Camera className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        onClick={() => navigate("/cart")}
        size="icon"
      ><ShoppingCart className="h-7 w-7"/>
      </Button>

      {/* Dark Mode Toggle */}
      <ThemeToggle />

      {/* Authentication */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative rounded-full " size="icon">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user.photoURL || "/placeholder-avatar.jpg"}
                  alt={user.displayName || "User"}
                />
                <AvatarFallback>
                  {user.displayName ? (
                    user.displayName[0]
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-muted p-4" align="end" forceMount>
            {/* User Info Section */}
            <div className="flex flex-col items-center space-y-2 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user.photoURL || "/placeholder-avatar.jpg"}
                  alt={user.displayName || "User"}
                />
                <AvatarFallback>
                  {user.displayName ? (
                    user.displayName[0]
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold text-lg">
                  {user.displayName || "Demo User"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.email || "demo.user@example.com"}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <DropdownMenuItem
              onClick={handleDashboardClick}
              disabled={loading}
              className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md"
            >
              <User className="h-4 w-4" />
              <span>{loading ? "Loading..." : "Dashboard"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md"
            >
              <Settings className="h-4 w-4" /> {/* Add a settings icon */}
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/orders")}
              className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md"
            >
              <Package className="h-4 w-4" /> {/* Add an orders icon */}
              <span>My Orders</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <LogOut className="h-4 w-4" /> {/* Add a logout icon */}
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => navigate("/login")} variant="default">
          Sign In
        </Button>
      )}
    </div>
  );
};

DesktopNavigation.propTypes = navigationPropTypes;

// Main Nav component
const Nav = () => {
  const { user, loading } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDashboardClick = () => {
    console.log("User Role:", user?.role || "No role assigned");
    navigate("/dashboard");
  };

  return (
    <nav className="fixed top-0 w-full py-4 px-4 md:px-8 lg:px-32 flex items-center justify-between z-50 bg-secondary dark:bg-background/80 backdrop-blur-md shadow-md dark:shadow-none"> {/* Logo */}
      <h1 className="text-3xl font-black text-white">
        FAIRBASKET<span className="text-primary">.</span>
      </h1>

      {/* Desktop Navigation */}
      <DesktopNavigation
        user={user}
        search={search}
        setSearch={setSearch}
        navigate={navigate}
        handleLogout={handleLogout}
        handleDashboardClick={handleDashboardClick}
        loading={loading}
      />

      {/* Mobile Navigation */}
      <MobileNavigation
        user={user}
        search={search}
        setSearch={setSearch}
        navigate={navigate}
        handleLogout={handleLogout}
        handleDashboardClick={handleDashboardClick}
        loading={loading}
      />
    </nav>
  );
};

export default Nav;