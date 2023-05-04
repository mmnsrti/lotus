import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { FcRight, FcLeft } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getposts } from "../actions/Post";

export default function CustomIcons({ page }) {
  const { totalPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (page) {
      dispatch(getposts(page));
    }
  }, [page]);

  return (
    <Stack spacing={2}>
      <Pagination
        variant="outlined"
        aria-label="Pagination"
        page={ page|| 1}
        count={totalPages}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: FcLeft, next: FcRight }}
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    </Stack>
  );
}
