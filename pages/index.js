import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Banner from './component/Banner';
import MovieCard from './component/MovieCard';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Home =()=> {
  const [movieList, setMovieList] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const favouriteMovies = useSelector((state) => state.favorites);

  const headers = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjJhY2EzZjJkMmQ2ZDg0ZWIwMzk5NjEyMDU3NzRiMCIsInN1YiI6IjY0ZGM4YWUzMDAxYmJkMDQxYmY0NDc4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e9UV-HovNolGKzxTDmiZjSlHimAvjuVujIGDw9J4F0I',
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`,
      headers
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data?.results);
        setTotalPages(data?.total_pages);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);
  

  const onSearch = (e) => {
    const keyword = e.target.value;
    setSearchValue(keyword);
  };

  // Memoized filtered data
  const filteredData = useMemo(() => {
    const moviesData = isFavourite ? favouriteMovies : movieList;

    return moviesData?.filter((item) =>
      item?.title?.toLowerCase()?.includes(searchValue?.toLowerCase())
    );
  }, [localData, movieList, searchValue]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) return <>loading....</>;

  return (
    <div className={styles.container}>
      <div>
        <Head>
          <title>Movie List App</title>
        </Head>

        <Banner searchValue={searchValue} onSearch={onSearch} />

        <button onClick={() => setIsFavourite(true)}>Favourite Movies</button>
        <button onClick={() => setIsFavourite(false)}>Upcoming Movies</button>

        <div className={styles.grid}>
          {filteredData?.map((moviedata, key) => (
            <MovieCard data={moviedata} key={key} />
          ))}
        </div>

        <div className={styles.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>
             Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <footer className={styles.footer}>
          <a
            href="www.linkedin.com/in/naeema-bargir"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by&nbsp;<b>naeema_bargir</b>&nbsp;⚡️
          </a>
        </footer>
      </div>
    </div>
  );
}


export default Home