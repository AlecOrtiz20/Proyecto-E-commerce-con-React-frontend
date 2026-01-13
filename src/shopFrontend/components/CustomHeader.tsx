import { useRef,  type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CunstomLogo } from "@/components/custom/CustomLogo";
import { authStateUser } from "@/auth/store/Store-auth";

export function CustomHeader(){

  const [param, setParam] = useSearchParams();
  const searchValue = param.get("search") ?? "";
  const {gender} = useParams();
  const { logout, isAdmin, authenticated} = authStateUser();

  const navigate = useNavigate();
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyBoardInput = (e: KeyboardEvent<HTMLInputElement>) => {

      if(e.key !== "Enter") return;

      const newSearchParam = new URLSearchParams();
      const queryValue = inputRef.current?.value;

      if(!queryValue){
        newSearchParam.delete('search');
      }else{
        newSearchParam.set("search", inputRef.current?.value ?? "");
      };

      setParam(newSearchParam);
  };

  const handleLogout = async () => {
   await logout();
    navigate("/auth/login", {replace: true})

  };


  return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <CunstomLogo/>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={cn(`font-montserrat text-sm hover:text-primar`, 
                !gender ? 'underline underline-offset-4' : ''
            )}  >
              Inicio
            </Link>

            <Link to="/gender/men" className={cn(`font-montserrat text-sm hover:text-primar`, 
                gender === 'men' ? 'underline underline-offset-4' : ''
            )}>
              Hombres
            </Link>

            <Link to="/gender/women" className={cn(`font-montserrat text-sm hover:text-primar`, 
                gender === 'women' ? 'underline underline-offset-4' : ''
            )}>
              Mujeres
            </Link>

            <Link to="/gender/kid" className={cn(`font-montserrat text-sm hover:text-primar`, 
                gender === 'kid' ? 'underline underline-offset-4' : ''
            )}>
              Ninos
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                 placeholder="Buscar productos..." 
                 ref={inputRef} 
                 className="pl-9 w-64 h-9 bg-white" 
                 onKeyDown={handleKeyBoardInput} defaultValue={searchValue}/>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            { authenticated === "no-authenticated" ? (
              <Button variant="default" size="sm" className="relative">
                <Link to="/auth/login">
                    Login
                </Link>
              </Button>

            ) : (
              <Button variant="destructive" size="sm" className="relative" onClick={handleLogout}>
                  Logout
              </Button>
            )}

            {
              isAdmin() && (
              <Button variant="secondary" size="sm" className="relative">
                <Link to="/admin">
                    Admin
                </Link>
              </Button>
              )
            }

          </div>
        </div>
      </div>
    </header>;
};
export default CustomHeader;