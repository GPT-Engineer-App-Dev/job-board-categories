import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, VStack, Text, Select, Box, Heading, SimpleGrid, Card, CardBody } from "@chakra-ui/react";
import { useJobs } from "../integrations/supabase/index.js";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const { data: jobs, error, isLoading } = useJobs();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.job_area === selectedCategory)
    : jobs;

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Remote Tech Jobs
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Find your next remote job in tech. Filter by category to narrow down your search.
        </Text>
        <Select
          placeholder="Filter by category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Product">Product</option>
          <option value="Design">Design</option>
          <option value="Engineering">Engineering</option>
        </Select>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {filteredJobs.map((job) => (
            <Card key={job.id} borderWidth="1px" borderRadius="lg" onClick={() => navigate(`/job/${job.id}`)} cursor="pointer">
              <CardBody>
                <Heading as="h3" size="md">
                  {job.jobs_title}
                </Heading>
                <Text mt={2}>{job.job_area}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;