import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productSearch, productStartLoading, searchProduct } from '../../actions/admin';

export const AutoCompleteFilter = () => {
    const { products } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [termino, settermino] = useState('');

    useEffect(() => {
        if (termino.length === 0) {
            dispatch(productStartLoading('1'))
        } else {
            dispatch(searchProduct(termino))
        }
    }, [termino.length])

    return (
        <div>
            <Autocomplete
                disablePortal
                options={products}
                clearIcon={null}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Buscar..."
                        color='secondary'
                        variant='standard'
                        onChange={(e) => settermino(e.target.value)}
                        onKeyUp={(e) => settermino(e.target.value)}
                        onSelect={(e) => settermino(e.target.value)}

                        value={params.value}
                        sx={{
                            margin: '4px auto',
                        }}
                    />
                }

            />
        </div>
    )
}
