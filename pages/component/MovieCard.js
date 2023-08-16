import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useState, useEffect, useMemo } from 'react';

export default function MovieCard(data) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites =
      typeof window !== 'undefined' && localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleAddToFavorites = (movie) => {
    if (!favorites.find((fav) => fav?.id === movie?.id)) {
      const updatedFavorites = [...favorites, movie];
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = favorites.filter((fav) => fav?.id !== movie?.id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
      setFavorites(updatedFavorites);
    }
  };

  const isfavourite = useMemo(() => {
    return favorites.some((item) => item?.id === data?.data?.id);
  }, [favorites, data]);

  return (
    <div className={styles.card}>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${data?.data?.backdrop_path}`}
        height={150}
        width={150}
        decoding="async"
        loading="lazy"
        data-nimg="1"
        alt={data?.data?.title}
      />
      <br />
      <svg
        style={{ color: isfavourite ? 'red' : '' }}
        onClick={() => handleAddToFavorites(data?.data)}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.heart}
      >
        <path d="M20.84 4.5A5.5 5.5 0 0 0 17.5 3a5.5 5.5 0 0 0-3.34 1.17L12 5.34l-2.16-1.17A5.5 5.5 0 0 0 6.5 3a5.5 5.5 0 0 0-3.34 1.17 5.5 5.5 0 0 0 0 8.66L12 21.35l9.84-8.52a5.5 5.5 0 0 0 0-8.66z" />
      </svg>
      <Link href={data?.data?.id?.toLocaleString()}>
        <h3>{data?.data?.title}</h3>{' '}
      </Link>
      <p>{data?.data?.release_date}</p>
    </div>
  );
}
