import { useParams } from "react-router-dom";
import { Container, VStack, Heading, Text, Box } from "@chakra-ui/react";
import { useJob } from "../integrations/supabase/index.js";

const JobDetails = () => {
  const { id } = useParams();
  const { data: job, error, isLoading } = useJob(id);

  if (isLoading) {
    return (
      <Container maxW="container.lg" py={10}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Loading...
          </Heading>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.lg" py={10}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Error loading job details: {error.message}
          </Heading>
        </VStack>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxW="container.lg" py={10}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Job Not Found
          </Heading>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          {job.jobs_title}
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Category: {job.job_area}
        </Text>
        <Box p={5} shadow="md" borderWidth="1px">
          <Text mt={4}>Type: {job.job_type}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default JobDetails;