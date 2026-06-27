import './StatsCard.scss'

type Props = {
    src: string,
    title: string,
    number: number,
}

const StatsCard = (props: Props) => {
    return (
        <div className="stats-card">
            <img src={props.src} width={40} height={40} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.number}</p>
        </div>
    )
}

export default StatsCard
