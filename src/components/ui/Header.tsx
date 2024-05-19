import { FC } from 'react'

interface HeaderProps {
    title: string
}

const Header: FC<HeaderProps> = ({
    title
}) => {
    return (
        <div>
            <h1 className='text-xl text-primary-foreground'>{title}</h1>
        </div>
    )
}

export default Header