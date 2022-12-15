import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../services/image-api';
import { AppBox, Message, MessageQuery } from './App.styled';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    async function getImages() {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        const { hits, totalHits } = data;
        setImages(prevImg => [...prevImg, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        toast.error('Something went wrong, please try again later');
      } finally {
        setIsLoading(false);
      }
    }
    if (query) {
      getImages();
    }
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (modalImage, modalAlt) => {
    setShowModal(prevShowModal => !prevShowModal);
    setModalImage(modalImage);
    setModalAlt(modalAlt);
  };

  return (
    <AppBox>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery openModal={toggleModal} images={images} />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      {totalHits / 12 >= page && <Button onClick={loadMore} />}
      {isLoading && <Loader />}
      {totalHits === 0 && (
        <Message>
          Sorry, there are no images matching your search:{' '}
          <MessageQuery>"{query}"</MessageQuery>. Please try again.
        </Message>
      )}
      {showModal && (
        <Modal
          modalImage={modalImage}
          modalAlt={modalAlt}
          closeModal={toggleModal}
        />
      )}
    </AppBox>
  );
};
