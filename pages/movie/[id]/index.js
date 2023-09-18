import { useEffect, useState } from 'react';
import styles from '../../../styles/Home.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function MovieDetails() {
  const router = useRouter();
  const [movieInfo, setMovieInfo] = useState({});

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
      `https://api.themoviedb.org/3/movie/${parseFloat(
        router?.query?.id?.replace(/,/g, '')
      )}?language=en-US`,
      headers
    )
      .then((response) => response.json())
      .then((response) => setMovieInfo(response))
      .catch((err) => console.error(err));
  }, [router?.query?.id]);

  return (
    <div className={styles.container}>
      <div className={styles.movieInfo}>
        <div className={styles.grid}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movieInfo?.backdrop_path}`}
            height={150}
            width={150}
            decoding="async"
            loading="lazy"
            data-nimg="1"
            alt={movieInfo?.title}
          />
          <div>
            <h3>
              {movieInfo?.title}
              <p>{movieInfo?.genres?.map((gener) => `${gener?.name}, `)}</p>
            </h3>
            <p>{movieInfo?.release_date}</p>
            <p>{movieInfo?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
