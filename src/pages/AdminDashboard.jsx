import { useNavigate } from "react-router-dom";
import { Container, VStack, Heading, Button, Text, SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { useJobs, useDeleteJob } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { session, logout } = useSupabaseAuth();
  const { data: jobs, error, isLoading } = useJobs();
  const deleteJobMutation = useDeleteJob();

  if (!session) {
    navigate("/admin-login");
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  const handleDelete = (id) => {
    deleteJobMutation.mutate(id);
  };

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Admin Dashboard
        </Heading>
        <Button colorScheme="red" onClick={logout}>
          Logout
        </Button>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {jobs.map((job) => (
            <Card key={job.id} borderWidth="1px" borderRadius="lg">
              <CardBody>
                <Heading as="h3" size="md">
                  {job.jobs_title}
                </Heading>
                <Text mt={2}>{job.job_area}</Text>
                <Button colorScheme="red" mt={4} onClick={() => handleDelete(job.id)}>
                  Delete
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default AdminDashboard;