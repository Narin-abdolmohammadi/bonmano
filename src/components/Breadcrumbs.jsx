import styles from './Breadcrumbs.module.css';
// items: [{label: "string", link: "string"}]
const Breadcrumbs = (props) => {
    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb" {...props}>
            <ul className={styles.breadcrumbsList}>
                {props.items.map((item, index) => (
                    <li className={styles.breadcrumbsItem} key={index}>
                        <a className={styles.breadcrumbsLink} href={item.link}>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumbs;