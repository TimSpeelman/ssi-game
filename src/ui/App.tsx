import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { NetworkCanvas } from './components/NetworkCanvas';

export function App() {
    return (
        <div className="fill">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Identity Game</Typography>
                </Toolbar>
            </AppBar>
            <NetworkCanvas />
        </div>
    );
}
