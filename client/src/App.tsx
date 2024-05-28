import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import RoomCard from "@/components/card/room-card";
import StatusesCard from "@/components/card/statuses-card";
import RolesCard from "@/components/card/roles-card";
import ModalContainer from "./components/modals/view";

function App() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />

                <main className="flex-1 container py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-6 md:mt-12 lg:mt-32">
                        <RolesCard />

                        <StatusesCard />

                        <RoomCard />
                    </div>
                </main>

                <Footer />
            </div>

            <ModalContainer />
        </>
    );
}

export default App;
