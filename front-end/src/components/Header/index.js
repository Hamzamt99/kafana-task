import React, { useEffect } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/reducers/user.reducer';
import { getProfile } from '../../store/reducers/profile.reducer';

const Links = ['Home'];

const NavLink = ({ children }) => {
    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'/'}
        >
            {children}
        </Box>
    );
};

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileState = useSelector(state => state.profile)
    const handleLogout = () => {
        dispatch(logOut());
        navigate('/signin');

    };

    useEffect(() => {
        dispatch(getProfile())
    }, [])
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                            >
                                {
                                    profileState.profile &&
                                    <Avatar
                                        size={'sm'}
                                        src={profileState.profile.profileImage}
                                    />
                                }
                            </MenuButton>
                            <MenuList>
                                <Link to='/profile' ><MenuItem>Profile</MenuItem></Link>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
