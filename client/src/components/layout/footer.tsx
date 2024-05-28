const Footer = () => {
    return (
        <footer className="bg-primary text-white py-4 px-6 flex items-center justify-between">
            {/* Right Reserved */}
            <p className="text-xs sm:text-sm">
                &copy; {new Date().getFullYear()} Signal Message. All Rights
                Reserved.
            </p>
        </footer>
    );
};
export default Footer;
