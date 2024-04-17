/* eslint-disable no-unused-vars */
import axios from 'axios';
import wait from '../image/wait.mp4';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Select, MenuItem, Tooltip } from '@mui/material';
import { AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, ButtonGroup, Typography, Checkbox, FormControl } from '@mui/material';
import logo1 from "../image/logo1.png";
import { storage } from '../firebase.config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import "../PerformOCR.css"
import loader2 from '../image/loader2.gif';
import Avtar from '../image/Avtar.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import jsPDF from 'jspdf';
import ReactPlayer from 'react-player'
import flag from '../image/flag.png'
import { Facebook, Twitter, Instagram, LinkedIn, Language } from '@mui/icons-material'


const DeselectConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to deselect all files?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Deselect All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete all files?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Delete All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CheckboxDeselectConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to deselect this file?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Deselect
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const FileDeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this file?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const AdminPerformOCR = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [dataa, setDataa] = useState([]);
  const [uiddd, setUiddd] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [importantFiles, setImportantFiles] = useState(new Set());
  const [isDataReady, setIsDataReady] = useState(false); // State to track data readiness for download
  const [pdfUrl, setpdfUrl] = useState(null);
  const [csvurl, setcsvUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [downloadFileName, setDownloadFileName] = useState("");
  const [uploadedFileNames, setUploadedFileNames] = useState(new Set());
  const [toastMessage, setToastMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(['Excel']);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deselectDialogOpen, setDeselectDialogOpen] = useState(false);
  const [deselectDialogOpen2, setDeselectDialogOpen2] = useState(false);
  const [deleteDialogOpen2, setDeleteDialogOpen2] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [username, setUsername] = useState('');


  const TokenId = localStorage.getItem('token')
  const navigate = useNavigate();
  const userType = localStorage.getItem('type');
  const MAX_IMAGE_UPLOADS = 100;
  const remainingImageCount = MAX_IMAGE_UPLOADS - uploadedFiles.length;

  useEffect(() => {
    if (isLoading) {
      setIsVideoPlaying(true); // Start playing the video when loading starts
    } else {
      setIsVideoPlaying(false); // Stop playing the video when loading finishes
    }
  }, [isLoading]);

  useEffect(() => {
    if (pdfUrl && csvurl) {
      // Both pdfUrl and csvurl are set, you can perform your action here
      storeFile(pdfUrl, csvurl);
    }
  }, [csvurl]);
  useEffect(() => {
    fetchUser()
  }, []);

  const handleProfileClick = () => {
    navigate('/adminProfile');
  };


  const handleCheckboxToggle = (fileName, isChecked) => {
    setSelectedFileName(fileName);
    if (!isChecked) {
      // Open the deselect confirmation dialog when deselecting checkbox
      setDeselectDialogOpen2(true);
    } else {
      const updatedFiles = uploadedFiles.map(file =>
        file.name === fileName ? { ...file, selected: isChecked } : file
      );
      setUploadedFiles(updatedFiles);
      if (isChecked) {
        setImportantFiles(prev => new Set([...prev, fileName]));
      } else {
        const updatedImportantFiles = new Set(importantFiles);
        updatedImportantFiles.delete(fileName);
        setImportantFiles(updatedImportantFiles);
      }
    }
  };
  const convertToPDF = (data, type) => {
    const pdf = new jsPDF();

    // Set up list headers
    pdf.text('Important Files:', 10, 10);

    let y = 20; // Start position for items

    data.forEach((dataItems) => {
      dataItems.forEach((item) => {
        const markedAsImportant = importantFiles.has(item.file) ? 'Yes' : 'No';
        const listItem = `Important: ${markedAsImportant}\n`;
        pdf.text(listItem, 10, y);

        const companyNames = `  Company Names: ${item.company_names.join(', ')}\n`;
        pdf.text(companyNames, 10, y + 10);

        const contactNumbers = `  Contact Numbers: ${item.contact_numbers.join(', ')}\n`;
        pdf.text(contactNumbers, 10, y + 20);

        const designations = `  Designations: ${item.designations.join(', ')}\n`;
        pdf.text(designations, 10, y + 30);

        const emailAddresses = `  Email Addresses: ${item.email_addresses.join(', ')}\n`;
        pdf.text(emailAddresses, 10, y + 40);

        const locations = `  Locations: ${item.locations}\n`;
        pdf.text(locations, 10, y + 50);

        const personNames = `  Person Names: ${item.person_names.join(', ')}\n`;
        pdf.text(personNames, 10, y + 60);

        const services = `  Services: ${item.services.join(', ')}\n`;
        pdf.text(services, 10, y + 70);

        const websiteURLs = `  Website URLs: ${item.website_urls.join(', ')}\n`;
        pdf.text(websiteURLs, 10, y + 80);

        y += 100; // Move to next item
      });
    });

    console.log("asdasd", type == "download");
    if (type == "download") {
      // Save PDF
      pdf.save(`${downloadFileName}.pdf`)
    } else {

      const pdfBlob = pdf.output('blob');
      const storageRef = ref(storage, `files/${downloadFileName}.pdf `);// Also update the file name for Firebase storage
      const uploadTask = uploadBytesResumable(storageRef, pdfBlob);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle progress
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          console.error('Error uploading file to Firebase:', error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("dddddddd", downloadURL);
            setpdfUrl(downloadURL);

          });
          console.log('Pdf File uploaded successfully!');

        }
      );


    }

  };

  const handleConfirmDeselect = () => {
    // Perform deselect action here
    const updatedFiles = uploadedFiles.map(file =>
      file.name === selectedFileName ? { ...file, selected: false } : file
    );
    setUploadedFiles(updatedFiles);
    setDeselectDialogOpen2(false);
  };

  const handleDelete2 = (fileName) => {
    setSelectedFileName(fileName);
    // Open the delete confirmation dialog when deleting a file
    setDeleteDialogOpen2(true);
  };

  const handleConfirmDelete = () => {
    // Perform delete action here
    const updatedFiles = uploadedFiles.filter(file => file.name !== selectedFileName);
    setUploadedFiles(updatedFiles);
    setDeleteDialogOpen2(false);
  };


  const showToast = (message) => {
    setToastMessage(message);
    toast.warning(message);
  };

  useEffect(() => {
    const locUid = localStorage.getItem('uid');
    setUiddd(locUid);
  }, [])

  // useEffect(() => {
  //   if (userType === 'admin') {
  //     navigate('/admin');
  //   }
  // }, [navigate, userType]);

  const handleSelectAll = () => {
    if (!selectAllChecked) {
      const updatedFiles = uploadedFiles.map(file => ({
        ...file,
        selected: !selectAllChecked // Toggle the selection status
      }));
      setUploadedFiles(updatedFiles);
      setSelectAllChecked(prev => !prev);

      const updatedImportantFiles = new Set(updatedFiles.map(file => file.name)); // Add all file names to importantFiles
      setImportantFiles(updatedImportantFiles);
    } else {
      // Open the deselect confirmation dialog when deselecting all
      setDeselectDialogOpen(true);
    }
  };

  const handleCloseDeselectDialog = () => {
    // Close the deselect confirmation dialog
    setDeselectDialogOpen(false);
  };

  const handleConfirmDeselectAll = () => {
    // Perform deselect action here
    const updatedFiles = uploadedFiles.map(file => ({
      ...file,
      selected: false // Deselect all files
    }));
    setUploadedFiles(updatedFiles);
    setSelectAllChecked(false);
    setImportantFiles(new Set()); // Clear the importantFiles

    // Close the deselect confirmation dialog
    setDeselectDialogOpen(false);
  };

  const handleHover = (e) => {
    e.target.style.boxShadow = '0px 6px 12px rgba(57, 59, 197, 0.3)'; // Change box shadow on hover
  };

  const handleLeave = (e) => {
    e.target.style.boxShadow = '0px 4px 8px rgba(57, 59, 197, 0.1)'; // Reset box shadow on leave
  };

  const handleInputChange = (event) => {
    setDownloadFileName(event.target.value);
  };

  const handleDelete = (fileName) => {
    const updatedFiles = uploadedFiles.filter(file => file.name !== fileName);
    setUploadedFiles(updatedFiles);
  };


  const fetchData = async () => {
    if (!downloadFileName.trim()) { // Check if file name is empty or contains only whitespace
      showToast('Please enter a file name.');
      return;
    }
    setIsLoading(true);

    try {
      const axiosConfig = {
        headers: {
          'Authorization': `Bearer ${TokenId}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      const data1 = new FormData();
      uploadedFiles.forEach(file => {
        data1.append('attachment_file', file.file);
      });

      const response = await axios.post('https://3.109.181.180/cardapi/v1/get_text_extract', data1, axiosConfig,{ timeout: 500000 });
      console.log("=================>", response.data.data.output_data);
      const extractedData = response.data.data.output_data.map(item => ({ ...item, file: item.filename }));
      setDataa([...dataa, extractedData]);

      setIsDataReady(true);
      console.log("response.data.data.output_data >", extractedData);
      if (response.data.data.output_data.length > 0) {
        await convertToPDF([extractedData], "upload");

        const csvContent = await convertToCSV();
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;


        const storageRef = ref(storage, `files/${downloadFileName}.csv`); // Also update the file name for Firebase storage
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on('state_changed',
          (snapshot) => {
            // Handle progress
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
          },
          (error) => {
            console.error('Error uploading file to Firebase:', error);
          },
          () => {
            // Upload complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("dddddddd", downloadURL);
              setcsvUrl(downloadURL);

            });
            console.log('File uploaded successfully!');

          }

        );

      }
    } catch (error) {
      console.error('Error uploading file and getting response:', error);
    }

    setIsLoading(false);
  };

  const storeFile = async (pdf, csv) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${TokenId}`,);
      console.log("asdasd", pdfUrl, csvurl);
      const formdata = new FormData();
      console.log("========uiddd   ================", uiddd);
      formdata.append("user_id", uiddd);
      const appendDatacsv = downloadFileName + '.csv'
      const appendDatapdf = downloadFileName + '.pdf'
      formdata.append("file_name_excel", appendDatacsv);
      formdata.append("file_name_pdf", appendDatapdf);

      formdata.append("file_url_excel", csvurl);
      formdata.append("file_url_pdf", pdfUrl);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = await fetch("https://3.109.181.180/cardapi/v1/file_store", requestOptions);
      const result = await response.text();
      console.log("////////555555555555555555///////", result);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to convert data to CSV format
  const convertToCSV = () => {
    let csvContent = "Important,Company Names, Contact Numbers, Designations, Email Addresses, Locations, Person Names, Services, Website URLs\n";
    dataa.forEach((dataItems) => {
      dataItems.forEach((item) => {
        const markedAsImportant = importantFiles.has(item.file) ? 'Yes' : 'No';
        const row = [
          markedAsImportant,
          `"${item.company_names}"`,
          `"${item.contact_numbers.join(', ')}"`,
          `"${item.designations.join(', ')}"`,
          `"${item.email_addresses.join(', ')}"`,
          `"${item.locations}"`,
          `"${item.person_names.join(', ')}"`,
          `"${item.services.join(', ')}"`,
          `"${item.website_urls.join(', ')}"`
        ].join(",");
        csvContent += row + "\n";
      });
    });
    return csvContent;
  };

  const fetchUser = async () => {
    try {
      const TokenId = localStorage.getItem('token');
      const userId = localStorage.getItem('uid');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${TokenId}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`https://3.109.181.180/cardapi/v1/get_all_user?user_id=${userId}`, requestOptions);
      const data = await response.json();

      const username = data?.data?.user_data?.[0]?.username;
      setUsername(username);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle download action
  const handleDownload = () => {
    if (selectedOptions.length === 0) {
      // No file selected
      return;
    }
    if (selectedOptions.includes('Excel') && selectedOptions.includes('PDF')) {
      const csvContent = convertToCSV();
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${downloadFileName}.csv`); // Dynamically set the file name based on the input field

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);


      const pdfContent = convertToPDF(dataa, "download");

    }
    else if (selectedOptions.includes('Excel')) {
      const csvContent = convertToCSV();
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${downloadFileName}.csv`); // Dynamically set the file name based on the input field

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
    else if (selectedOptions.includes('PDF')) {
      const pdfContent = convertToPDF(dataa, "download");

    }
  };

  // const handleCheckboxToggle = (fileName, isChecked) => {
  //   const updatedFiles = uploadedFiles.map(file =>
  //     file.name === fileName ? { ...file, selected: isChecked } : file
  //   );
  //   setUploadedFiles(updatedFiles);

  //   if (isChecked) {
  //     setImportantFiles(prev => new Set([...prev, fileName]));
  //   } else {
  //     const updatedImportantFiles = new Set(importantFiles);
  //     updatedImportantFiles.delete(fileName);
  //     setImportantFiles(updatedImportantFiles);
  //   }
  // };
  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {

      const updatedFiles = acceptedFiles.filter(file => !uploadedFileNames.has(file.name)) // Check for duplicates
        .map(file => ({
          name: file.name,
          url: URL.createObjectURL(file),
          file: file
        }));

      setUploadedFiles(prevFiles => [...prevFiles, ...updatedFiles]);
      setUploadedFileNames(prevNames => new Set([...prevNames, ...updatedFiles.map(file => file.name)]));
    },
  });

  const handleDeleteAll = () => {
    // Open the delete confirmation dialog
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    // Close the delete confirmation dialog
    setDeleteDialogOpen(false);
  };

  const handleConfirmDeleteAll = () => {
    // Perform delete action here
    setUploadedFiles([]);
    setUploadedFileNames(new Set());
    setImportantFiles(new Set());
    // Close the delete confirmation dialog
    setDeleteDialogOpen(false);
  };

  return (
    <div>
      <AppBar position='relative' style={{ backgroundColor: '#393bc5', boxShadow: 'none' }}>
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='egg' src={logo1} style={{ height: '70px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', marginLeft: '10px' }}>
              <span style={{ flexGrow: 1, color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>Data </span>Mines
              </Typography>
            </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography onClick={handleProfileClick} style={{ paddingRight: '10px' }}>Hello, {username}</Typography>
            <img src={Avtar} style={{ height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '50px' }} onClick={handleProfileClick} />
          </div>
        </Toolbar>
      </AppBar>
      <br />
      <Link to="/admindashboard">
        <ArrowBackIcon style={{ margin: '10px', color: '#393BC5' }} />
      </Link>  <br />  <br />  <br />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <ToastContainer />
        <input
          type="text"
          placeholder='Enter File Name Here'
          name='File name'
          value={downloadFileName}
          onChange={handleInputChange}
          style={{
            width: '200px',
            textAlign: 'center',
            transition: 'border-color 0.3s, box-shadow 0.3s', // Add transition for border color and box shadow
            border: '2px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            outline: 'none',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', // Add a subtle shadow

          }}
          onFocus={(e) => e.target.style.borderColor = '#393bc5'} // Change border color on focus
          onBlur={(e) => e.target.style.borderColor = '#ccc'} // Reset border color on blur
        />

      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', flexDirection: 'column' }}>
        {remainingImageCount > 0 ? (
          <>
            <span style={{ fontFamily: "arial" }}>{`${MAX_IMAGE_UPLOADS - remainingImageCount} Out Of ${MAX_IMAGE_UPLOADS} Images Uploaded`}</span>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#393bc5", color: 'white', marginRight: '10px' }}
                onClick={handleSelectAll}
              >
                {selectAllChecked ? 'Deselect All' : 'Select All'}
              </Button>
              <DeselectConfirmationDialog
                open={deselectDialogOpen}
                onClose={handleCloseDeselectDialog}
                onConfirm={handleConfirmDeselectAll}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: 'white' }}
                onClick={handleDeleteAll}
              >
                Delete All
              </Button>
              <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDeleteAll}
              />
            </div>
          </>
        ) : (
          <p>No more images can be uploaded</p>
        )}
      </div>
      <div style={{ display: 'flex', margin: '30px', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {uploadedFiles.length <= 50 ?
          <div {...getRootProps()} style={{ border: '2px dashed #393bc5', borderRadius: '5px', width: '120px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
            <input {...getInputProps()} />
            <p style={{ fontSize: '30px', color: '#393bc5' }}>+</p>
          </div> : <></>}

        {uploadedFiles.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {uploadedFiles.map((file, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                <img src={file.url} alt={file.name} style={{ width: '100px', height: '100px', margin: '10px' }} />
                <div style={{ flexDirection: 'row', display: 'flex', gap: 20 }}>
                  <Tooltip title="Checked card will be shown as important card in data" arrow>
                  <input
                    type="checkbox"
                    checked={file.selected}
                    onChange={(e) => handleCheckboxToggle(file.name, e.target.checked)}
                    style={{ marginTop: '10px', height: 20, width: 20, backgroundColor: '#393bc5', color: '#393bc5', cursor: 'pointer' }}
                  />
                  </Tooltip>
                  <DeleteIcon onClick={() => handleDelete2(file.name)} style={{ cursor: 'pointer', marginTop: '8px', height: 25, width: 25, color: '#393bc5' }} />
                </div>
              </div>
            ))}
          </div>
        )}
        <CheckboxDeselectConfirmationDialog
          open={deselectDialogOpen2}
          onClose={() => setDeselectDialogOpen2(false)}
          onConfirm={handleConfirmDeselect}
        />
        <FileDeleteConfirmationDialog
          open={deleteDialogOpen2}
          onClose={() => setDeleteDialogOpen2(false)}
          onConfirm={handleConfirmDelete}
        />

      </div>



      <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        {isLoading && (
          <div className='video' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <video autoPlay loop muted controls={false} style={{ width: '80vw', maxHeight: '60vh' }}>
              <source src={wait} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {!isLoading && (
          <Button variant="contained" style={{ backgroundColor: "#393bc5", color: 'white', marginBottom: '10px' }} onMouseEnter={handleHover}
            onMouseLeave={handleLeave} onClick={fetchData} disabled={uploadedFiles.length === 0}>
            Fetch Data
          </Button>
        )}
        <div>
          {isLoading && (
        <div style={{marginBottom:'10vh'}}>
              <p style={{ color: 'red', fontSize: '2rem', fontFamily: 'Inter, sans-serif', marginTop: '10px' }}>Do not refresh the page (it make take long time)</p>
              <p style={{ color: 'black', fontSize: '1.3rem', fontFamily: 'Inter, sans-serif' }}>Watch a award-winning film while we work on your results. Thanks for being patience.</p>
            </div>
          )}
        </div>
      </div>

      {isDataReady && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: '10px' }}>
          <FormControl style={{ marginRight: '10px' }}>
            <Select
              labelId="file-type-label"
              multiple
              value={selectedOptions}
              onChange={handleChange}
              style={{
                minWidth: '200px',
                height: '40px',
                borderRadius: '5px',
                borderColor: '#fff',
                color: '#fff',
                backgroundColor: '#393bc5',
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Excel">
                <Checkbox checked={selectedOptions.includes('Excel')} />
                Download Excel
              </MenuItem>
              <MenuItem value="PDF">
                <Checkbox checked={selectedOptions.includes('PDF')} />
                Download PDF
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            style={{ backgroundColor: '#393bc5', color: '#fff', height: '35px', width: '200px' }}
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      )}

      {dataa.length > 0 && (
        <div style={{marginBottom:'10vh'}}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>Extracted Data:</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#393bc5' }}>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Sr.no</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Important</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Company Names</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Contact Numbers</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Designations</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Email Addresses</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Locations</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Person Names</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Services</TableCell>
                  <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Website URLs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataa.map((dataItems) => (
                  dataItems.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell >{id + 1}</TableCell>
                      <TableCell>{importantFiles.has(item.filename) && <p>Important</p>}</TableCell>
                      <TableCell>{item.company_names}</TableCell>
                      <TableCell>{item.contact_numbers.join(', ')}</TableCell>
                      <TableCell>{item.designations.join(', ')}</TableCell>
                      <TableCell>{item.email_addresses.join(', ')}</TableCell>
                      <TableCell>{item.locations}</TableCell>
                      <TableCell>{item.person_names.join(', ')}</TableCell>
                      <TableCell>{item.services.join(', ')}</TableCell>
                      <TableCell>{item.website_urls.join(', ')}</TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
       <div style={{ backgroundColor: '#2b3570', height: '15vh', justifyContent: 'flex-end', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
          <div style={{ paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://facebook.com/profile.php?id=61555752627560" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Facebook /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://twitter.com/KrazioCloud" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Twitter /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://instagram.com/krazio_cloud" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Instagram /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://linkedin.com/company/krazio-cloud" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><LinkedIn /></a>
              </Typography>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>
                <a href="https://kraziocloud.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}><Language /></a>
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography variant='body1' style={{ color: '#fff', fontSize: '14px' }}><a href='https://www.kraziocloud.com' style={{ color: '#fff', textDecoration: 'none' }}>
                A Product of Krazio Cloud Pvt. Ltd. (Proudly Made in </a></Typography>
              <img src={flag} style={{ height: '23px', width: '23px', marginRight: '5px', marginLeft: '5px' }} />
              <Typography variant='body1' style={{ color: '#fff' }}> )</Typography>
            </div>
          </div>
        </div>
    </div>
  );
};


export default AdminPerformOCR;
