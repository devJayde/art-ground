import React, { useEffect, useState } from 'react';
import { getAllGallery } from '../../api/reviewApi';
import Review from '../../components/review/Review';
import styles from './ReviewList.module.css';

const ReviewList = ({ isLogin, selectReview }) => {

  const [galleryList, setGalleryList] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchWord, setSearchWord] = useState('')

  useEffect(()=> {
    //standard, premium gallery, 마감된 전시 모두 모아서 setGalleryList에 넣기.
    async function getAxiosData(){
      setGalleryList(await getAllGallery());
      //console.log(await getAllGallery())
    }
    getAxiosData();
    //getAllGallery();
  }, [])

  const handleChange = (e) => {
    setSearchWord(e.target.value)
  }
  
  const handleSearchButton = () => {
    setFilter(searchWord);
    
    //여기서 필터해서 galleryList를 setState?

    // galleryList.filter((el) => {
    //   return el.title.toLowerCase().includes(filter.toLowerCase());
    // })

    //그리고 아래 랜더링 시 galleryList.length === 0 이면 검색결과가 없습니다 컴포넌트 띄우기
  }

  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleSearchButton()
    }
  }


  return (
    <section className={styles.container}>
      <div className={styles.searchBox}>
        <input className={styles.search} 
        placeholder="전시회 검색" 
        type="text" 
        value={searchWord}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        />
        <button className={styles.searchIcon}
        onClick={handleSearchButton}
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
      <ul className={styles.reviews}>
        {galleryList
        .map((el) => (
          <Review
          selectReview={selectReview} 
          exhibition={el}
          />
        ))}
      </ul>
    </section>
  )
}
export default ReviewList;