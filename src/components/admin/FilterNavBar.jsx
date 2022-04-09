
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { productSearch, productStartLoading, searchProduct } from '../../actions/admin';
import { closePaginacion, openPaginacion } from '../../actions/ui';
import { Box } from '@mui/system';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export const FilterNavBar = () => {
    const [termino, settermino] = useState('');
    const { products } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    const listarNombres = () => {
        let lista = []
        products.map(product => {
            lista.push(product.name)
        })
        return lista
    }
    const handleSearch = ({ target }) => {
        settermino(target.value);
    }

    useEffect(() => {
        if (termino.length === 0) {
            dispatch(productStartLoading())
            dispatch(openPaginacion(true))
        } else {
            dispatch(searchProduct(termino))
            dispatch(closePaginacion(false))
        }

    }, [termino])

    const handleClick = (nombre) => {
        dispatch(searchProduct(nombre))
        dispatch(closePaginacion(false))
        settermino(nombre)
    }
    return (
        <div>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'Buscar' }}
                    onChange={handleSearch}
                    value={termino}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Paper
                        sx={{
                            width: 235,
                            marginTop: '.05rem',
                        }}
                    >
                        {
                            termino.length > 0 &&
                            listarNombres().slice(0, 5).map((nombre, index) => (
                                <ListItem disablePadding key={index} >
                                    <ListItemButton
                                        onClick={() => handleClick(nombre)}>
                                        <ListItemText inset primary={nombre} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }

                    </Paper>
                </Box>
            </Search>
        </div>
    )
}
