import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Heading } from '@chakra-ui/react';
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const Login = () => {
    const { session } = useSupabaseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate('/');
        }
    }, [session, navigate]);

    return (
        <Container maxW="container.sm" py={10}>
            <Box p={5} shadow="md" borderWidth="1px">
                <Heading as="h1" size="lg" textAlign="center" mb={6}>
                    Admin Login
                </Heading>
                <SupabaseAuthUI />
            </Box>
        </Container>
    );
};

export default Login;