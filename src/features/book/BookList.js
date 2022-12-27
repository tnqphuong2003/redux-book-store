import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaginationBar from "../../components/PaginationBar";
import SearchForm from "../../components/SearchForm";
import { ClipLoader } from "react-spinners";
import { FormProvider } from "../../form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getBooks } from "./bookSlice";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";

function BookList() {
  const [pageNum, setPageNum] = useState(1);
  const totalPage = 10;
  const limit = 10;

  // const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { books, isLoading, error } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getBooks({ pageNum, limit, query }));
  }, [pageNum, limit, query, dispatch]);
  //--------------form
  const defaultValues = {
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    setQuery(data.searchQuery);
  };
  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Book Store
        </Typography>
        {error && <Alert severity="danger">{error}</Alert>}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <SearchForm />
          </Stack>
        </FormProvider>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPage}
        />
      </Stack>
      <div>
        {isLoading ? (
          <Box sx={{ textAlign: "center", color: "primary.main" }}>
            <ClipLoader color="inherit" size={150} loading={true} />
          </Box>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            flexWrap="wrap"
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </Stack>
        )}
      </div>
    </Container>
  );
}

export default BookList;
