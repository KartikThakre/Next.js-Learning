import { getAvailableNewsYears } from "@/lib/news"
import Link from "next/link";


//? In Next.js routing, the @ symbol (e.g., @analytics or @dashboard) is used to define Parallel Routes.
//? Parallel Routes allow you to simultaneously or conditionally render one or more pages within the same layout, making them perfect for complex, dashboard-like user interfaces.



export default function ArchivePage() {

    const links = getAvailableNewsYears();

return (
<header id="archive-header">
        <nav>
            <ul>
                {links.map ((link) => (
                    <li key={link}>
                        <Link href={`/archive/${link}`}>{link}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
)
}