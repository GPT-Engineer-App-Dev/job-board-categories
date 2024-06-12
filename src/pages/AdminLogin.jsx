import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, VStack, Heading, Input, Button, Text } from "@chakra-ui/react";
import { supabase } from "../integrations/supabase/index.js";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate("/admin-dashboard"); // Redirect to admin dashboard after successful login
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Administrator Login
        </Heading>
        {error && <Text color="red.500">{error}</Text>}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Container>
  );
};

export default AdminLogin;