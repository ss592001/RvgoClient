import React, { useState ,useCallback,useEffect} from 'react';

export const Usecustomfileinput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

  };

  const openFileDialog = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', handleFileChange);
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  return { selectedFile, openFileDialog ,setSelectedFile,selectedImage,setSelectedImage};
};

export function useModelState(defaultvalue=false){
  const [isOpen,setIsOpen]=useState(defaultvalue);


  const open=useCallback(()=>setIsOpen(true),[])
  const close=useCallback(()=>setIsOpen(false),[])

  return {isOpen,open,close};
 
}

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};
