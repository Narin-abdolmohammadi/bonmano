import Breadcrumbs from "@/components/Breadcrumbs";
import links from "@/routes/links";
import { Outlet } from "react-router-dom";
import Footer from "../ClientLayout/Footer/Footer";

const links_urls = [
    {label: 'Rubikmap', link: '/'},
    {label: 'home', link: links.panel.home},
    {label: 'profile', link: links.panel.profile},
];

const PanelLayout = () => {
    return (
        <div>
            <header>
              <Breadcrumbs items={links_urls} />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default PanelLayout