import React, { forwardRef, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ImageIcon from '@mui/icons-material/Image';
import { useTheme } from '@mui/material/styles';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField, Alert, OutlinedInput } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openAlert } from '../../actions/ui';
import { useForm } from '../../hooks/useForms';
import { Box } from '@mui/system';
import validator from 'validator';
import Chip from '@mui/material/Chip';
import { productClear, productStartAddNew, productStartUpdate } from '../../actions/admin';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});
const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, talla, theme) {
    return {
        fontWeight:
            talla.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const inicialForm = {
    name: '',
    price: '',
    image: '',
    category: '',
    season: '',
    material: '',
    size: []
}
const tallas = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
];
export const DialogProducto = () => {
    const theme = useTheme();
    const { openModal } = useSelector(state => state.UI);
    const { activeProduct } = useSelector(state => state.admin);
    const [image, setImg] = useState('')
    const [talla, settalla] = useState([]);

    const [formValues, handleInputChange, setValues] = useForm(inicialForm);
    const { name, price, category, season, material, size } = formValues;
    const [ValidForm, setValidForm] = useState({})
    const dispatch = useDispatch();
    let precio = ''
    if (activeProduct) {
        precio = activeProduct.price.toString();
    }

    useEffect(() => {
        if (activeProduct) {
            setValues({
                ...formValues,
                name: activeProduct.name,
                price: precio.toString(),
                image: activeProduct.image,
                category: activeProduct.category,
                season: activeProduct.season,
                material: activeProduct.material,
                size: activeProduct.size,
            })
            settalla(activeProduct.size)
            setImg(activeProduct.image)
        } else {
            setValues(inicialForm)
        }
    }, [activeProduct, setValues])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        settalla(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setValues({ ...formValues, size: value })
    };
    const openImageDialog = () => {
        document.querySelector('#image').click();
    }
    const handleImg = (e) => {

        const imageFile = e.target.files[0];
        setValues({ ...formValues, image: imageFile })
        const imageUrl = URL.createObjectURL(imageFile);

        setImg(imageUrl)
    }

    const validarFormulario = () => {
        if (validator.isEmpty(name)) {
            setValidForm({
                name: true,
                msgname: 'El nombre es obligatorio'
            })
            return;
        }
        if (validator.isEmpty(price)) {
            setValidForm({
                price: true,
                msgprice: 'El precio es obligatorio'
            })
            return;
        }
        if (!validator.isNumeric(price)) {
            setValidForm({
                price: true,
                msgprice: 'El precio debe ser numerico'
            })
            return;
        }
        if (price <= 0) {
            setValidForm({
                price: true,
                msgprice: 'El precio debe ser mayor a 0'
            })
            return;
        }
        if (validator.isEmpty(category)) {
            setValidForm({
                category: true,
                msgcategory: 'Seleccione una categoría'
            })
            return;
        }
        if (validator.isEmpty(season)) {
            setValidForm({
                season: true,
                msgseason: 'Seleccione una temporada'
            })
            return;
        }
        if (validator.isEmpty(material)) {
            setValidForm({
                material: true,
                msgmaterial: 'Seleccione un material'
            })
            return;
        }
        if (size.length === 0) {
            setValidForm({
                size: true,
                msgsize: 'Seleccione una Talla'
            })
            return;
        }
        if (image === '') {
            setValidForm({
                image: true,
                msgimage: 'Seleccione una imagen'
            })
            return;
        }
        return true;
    }
    useEffect(() => {

        if (!validator.isEmpty(name)) {
            setValidForm({
                name: false,
                msgname: ''
            })
        }
        if (!validator.isEmpty(price)) {
            setValidForm({
                price: false,
                msgprice: ''
            })
        }
        if (!validator.isEmpty(category)) {
            setValidForm({
                category: false,
                msgcategory: ''
            })
        }
        if (!validator.isEmpty(season)) {
            setValidForm({
                season: false,
                msgseason: ''
            })
        }
        if (!validator.isEmpty(material)) {
            setValidForm({
                material: false,
                msgmaterial: ''
            })
        }
        if (size.length > 0) {
            setValidForm({
                size: false,
                msgsize: ''
            })
        }
    }, [name, price, category, season, material, size])

    const handleClose = () => {
        dispatch(closeModal());
        dispatch(productClear())
        setValues(inicialForm)
        settalla([])
        setImg('')
    };

    const handleSubmit = () => {
        if (validarFormulario()) {
            if (activeProduct) {
                dispatch(productStartUpdate({ ...formValues, id: activeProduct._id }, activeProduct._id))
                dispatch(openAlert('Actualización', 'Producto actualizado'));
            } else {
                dispatch(productStartAddNew(formValues))
                dispatch(openAlert('Creado', 'Producto Creado'));
            }
            handleClose();
        }
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={openModal}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} color='secondary'>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {activeProduct ? 'Actualizar Producto' : 'Agregar Nuevo Producto'}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSubmit}>
                            {activeProduct ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container fixed sx={{
                    marginTop: '2rem',
                    height: 700,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        width: '100%',
                        gap: '3rem',
                    }}>
                        <Box sx={{
                            width: { xs: '100%', sm: '100%', md: '50%' },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                        }}>
                            <TextField color="secondary"
                                label="Nombre"
                                variant="outlined"
                                name="name"
                                error={ValidForm.name}
                                helperText={ValidForm.msgname}
                                value={name}
                                onChange={handleInputChange}
                            />
                            <TextField color="secondary"
                                label="Precio"
                                type='number'
                                variant="outlined"
                                name='price'
                                error={ValidForm.price}
                                helperText={ValidForm.msgprice}
                                value={price}
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth>
                                <InputLabel color='secondary'>Categoría</InputLabel>
                                <Select
                                    name='category'
                                    value={category}
                                    error={ValidForm.category}
                                    label="Categoria"
                                    color='secondary'
                                    onChange={handleInputChange}
                                >
                                    <MenuItem defaultValue={'as'} value={'vestidos'}>Vestidos</MenuItem>
                                    <MenuItem value={'tops'}>Tops</MenuItem>
                                    <MenuItem value={'chaquetas y abrigos'}>Chaquetas Y Abrigos</MenuItem>
                                    <MenuItem value={'trajes y combinados'}>Trajes Y Combinados</MenuItem>
                                    <MenuItem value={'Pantalones'}>Pantalones</MenuItem>
                                </Select>
                                {ValidForm.category &&
                                    <Typography variant="body2" color="error" ml={2}>
                                        {ValidForm.msgcategory}
                                    </Typography>
                                }

                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel color='secondary'>Temporada</InputLabel>
                                <Select
                                    name='season'
                                    value={season}
                                    error={ValidForm.season}
                                    label="Temporada"
                                    color='secondary'
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={'otono / invierno'}>Otoño / Invierno </MenuItem>
                                    <MenuItem value={'primavera / verano'}>Primavera / Verano</MenuItem>
                                    <MenuItem value={'crucero / resort o pre-fall'}>Crucero / Resort o Pre-fall</MenuItem>
                                </Select>
                                {ValidForm.msgseason &&
                                    <Typography variant="body2" color="error" ml={2}>
                                        {ValidForm.msgseason}
                                    </Typography>
                                }
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel color='secondary'>Material</InputLabel>
                                <Select
                                    name='material'
                                    value={material}
                                    label="Material"
                                    error={ValidForm.material}
                                    color='secondary'
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={'algodon'}>Algodón</MenuItem>
                                    <MenuItem value={'lana'}>Lana</MenuItem>
                                    <MenuItem value={'Seda'}>Seda</MenuItem>
                                    <MenuItem value={'poliester'}>Poliéster</MenuItem>
                                    <MenuItem value={'viscosa'}>Viscosa </MenuItem>
                                    <MenuItem value={'cuero'}>Cuero</MenuItem>
                                </Select>
                                {ValidForm.msgmaterial &&
                                    <Typography variant="body2" color="error" ml={2}>
                                        {ValidForm.msgmaterial}
                                    </Typography>
                                }
                            </FormControl>
                            <Box>


                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel color='secondary' >Tallas Disponibles</InputLabel>
                                    <Select
                                        multiple
                                        value={talla}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Tallas Disponibles" color='secondary' />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {tallas.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, talla, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button variant="contained"
                                color="secondary"
                                sx={{ width: 250 }}
                                startIcon={<ImageIcon />}
                                onClick={openImageDialog}>

                                {activeProduct ? 'Actualizar imagen' : 'Subir imagen'}
                            </Button>
                            <input type="file" id="image" accept="image/*" hidden
                                onChange={handleImg}
                            />
                        </Box>
                        <Box sx={{
                            width: { xs: '100%', sm: '100%', md: '50%' },

                        }}>
                            {image ?
                                <img src={image} style={{ width: '100%', borderRadius: '1rem' }} />
                                :
                                <Alert severity={ValidForm.msgimage ? 'error' : `info`}>{ValidForm.msgimage ? `${ValidForm.msgimage}` : `No hay imagen!`}</Alert>
                            }
                        </Box>
                    </Box>


                </Container>

            </Dialog>
        </div >
    )
}
