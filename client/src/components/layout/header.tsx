import { Mail } from "lucide-react";
import Button from "@/components/ui/button";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import HeaderSheetContent from "../drawer/header-sheet-content";

const Header = () => {
    return (
        <>
            <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-medium">Barclay Dental</h1>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost">
                            <Mail className="w-6 h-6" />
                            <span className="sr-only">Message</span>
                        </Button>
                    </SheetTrigger>

                    <HeaderSheetContent />
                </Sheet>
            </header>
        </>
    );
};
export default Header;
