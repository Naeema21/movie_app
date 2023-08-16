import styles from '../../styles/Home.module.css';

export default function Banner({ searchValue, onSearch }) {
  return (
    <div className={styles.banner}>
      <div>
        <div>
          <h2>Welcome.</h2>
          <h3>
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>

        <form>
          <input
            onChange={onSearch}
            type="text"
            placeholder="Search for a movie title......"
            value={searchValue}
          />
        </form>
      </div>
    </div>
  );
}
