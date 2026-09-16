// components/Navbar.jsx
'use client'
import { ShoppingCart, HomeIcon, UserIcon, Dumbbell } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
    const { user } = useUser();
    const { openSignIn } = useClerk();
    const router = useRouter();
    const pathname = usePathname();

    const cartItems = useSelector(state => state.cart.items || []);
    const cartCount = cartItems.length;

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 bg-white z-50 ${isScrolled ? 'shadow-md' : ''} transition-all duration-300`}>
                <div className="mx-6">
                    <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
                        <Link href="/" className="relative text-3xl font-bold text-slate-800 flex items-center gap-2">
                            <Dumbbell className="text-red-600" size={28} />
                            Activate Gym
                        </Link>

                        <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                            <Link href="/" className={`hover:text-red-600 transition-colors relative font-medium ${pathname === '/' ? 'text-red-600' : ''}`}>
                                Home
                                {pathname === '/' && <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-red-600 rounded-full"></span>}
                            </Link>
                            <Link href="/about" className="hover:text-red-600 transition-colors font-medium">About</Link>
                            <Link href="/pricing" className="hover:text-red-600 transition-colors font-medium">Pricing</Link>
                            <Link href="/contact" className="hover:text-red-600 transition-colors font-medium">Contact</Link>

                            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors font-medium group">
                                <div className="relative">
                                    <ShoppingCart size={20} />
                                    {cartCount > 0 && (
                                        <div className="absolute -top-2 -right-2 text-[10px] font-bold text-white bg-red-600 group-hover:bg-red-700 transition-colors min-w-5 h-5 rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </div>
                                    )}
                                </div>
                                Cart
                            </Link>

                            {!user ? (
                                <button onClick={openSignIn}
                                    className="px-8 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition text-white rounded-full shadow-sm hover:shadow-md font-medium">
                                    Login
                                </button>
                            ) : (
                                <UserButton afterSignOutUrl="/" />
                            )}
                        </div>

                        <div className="flex sm:hidden items-center gap-3">
                            {user ? (
                                <UserButton afterSignOutUrl="/">
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<HomeIcon size={16}/>} label="Home" onClick={()=> router.push('/')} />
                                        <UserButton.Action labelIcon={<ShoppingCart size={16}/>} label="Cart" onClick={()=> router.push('/cart')} />
                                    </UserButton.MenuItems>
                                </UserButton>
                            ) : (
                                <button onClick={openSignIn} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                    <UserIcon size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <hr className="border-gray-200" />
            </nav>

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 sm:hidden shadow-lg">
                <div className="grid grid-cols-2 py-1">
                    <Link href="/" className={`flex flex-col items-center justify-center py-2 text-xs ${pathname === '/' ? 'text-red-600' : 'text-slate-600'}`}>
                        <HomeIcon size={20} className={`mb-1 ${pathname === '/' ? 'text-red-600' : 'text-slate-500'}`} />
                        <span className="font-medium">Home</span>
                    </Link>
                    <Link href="/cart" className={`flex flex-col items-center justify-center py-2 text-xs ${pathname.includes('/cart') ? 'text-red-600' : 'text-slate-600'} relative`}>
                        <div className="relative">
                            <ShoppingCart size={20} className={`mb-1 ${pathname.includes('/cart') ? 'text-red-600' : 'text-slate-500'}`} />
                            {cartCount > 0 && (
                                <div className="absolute -top-2 -right-2 text-[10px] font-bold text-white bg-red-600 min-w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </div>
                            )}
                        </div>
                        <span className="font-medium">Cart</span>
                    </Link>
                </div>
            </div>

            <div className="h-16 sm:h-20"></div>
        </>
    );
};

export default Navbar;