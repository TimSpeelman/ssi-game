import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { Fragment, MouseEvent as ReactMouseEvent } from 'react';
import { Actor } from '../data/Actor';
import { actorImage } from '../data/actorImage';

interface Props {
    onAdd: (actor: Actor) => void;
    actors: Actor[];
    label: string;
}

export function AddActorMenu(props: Props) {
    const [anchorEl, setAnchorEl] = React.useState<any>(null);

    const handleClick = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (actor: Actor) => {
        setAnchorEl(null);
        props.onAdd(actor);
    };

    return (
        <Fragment>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {props.label}
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {props.actors.map((actor) => (
                    <MenuItem key={actor.id} onClick={() => handleSelect(actor)}>
                        <img src={actorImage(actor.image)} style={{ height: '2rem' }} />
                        {actor.name}
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}
