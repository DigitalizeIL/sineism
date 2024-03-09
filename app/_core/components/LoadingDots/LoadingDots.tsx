import styles from "./LoadingDots.module.css"

export const LoadingDots = ({
    color = "#000",
    height,
}: {
    height?: number
    color?: string
}) => {
    return (
        <span
            className={styles.loading}
            style={{
                height,
            }}>
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
        </span>
    )
}
