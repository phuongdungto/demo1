import "./home.scss";
import Sidebar from "../../components/Layouts/DefaultLayout/Sidebar";
import cookies from 'react-cookies';
import { useState, useEffect } from "react";
import { createPost, deletePost, getListPostService, getPost } from "../../service/postService";
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Linkify from "linkify-react";
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { getListCommentService, createComment } from "../../service/commentService";
import { Image, NavDropdown, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { getUserService } from "../../service/authService";
import request from "../../core/utils/axios";
const socket = io('http://socialbook:3004');
const Home = () => {
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const [searchPost, setSearchPost] = useState({
        limit: 5,
        page: 1,
        userId: '',
        sort: 'createdAt',
        sortBy: 'desc'
    });
    const [posts, setPosts] = useState();
    const getListPost = async (search) => {
        try {
            const res = await getListPostService(search)
            const data = (res && res.data) ? res.data : [];
            setPosts(data.posts)
        } catch (error) {
            return error
        }
    }
    const bg = {
        overlay: {
            background: "#FFFF00"
        }
    };
    useEffect(() => {
        getListPost(searchPost);
    }, [searchPost])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 750,
        height: 650,
        overflow: 'scroll',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLoadMore = () => {
        setSearchPost({
            ...searchPost,
            limit: searchPost.limit + 5
        })
    }
    // --------------------------post handle------------------------------------------
    const [content, setContent] = useState({
        content: ''
    });
    const handleChangeContent = e => {
        console.log(content)
        const value = e.target.value;
        setContent({
            ...content,
            [e.target.name]: value
        });
    };

    const [file, setFile] = useState()
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleImageChange = (e) => {
        // console.log(e.target.files[])
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setFile({
                files: e.target.files
            })
            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };
    const deleteImage = (e) => {

        setSelectedFiles([
            selectedFiles.filter(function (image) {
                return image !== e
            })
        ]);
    }
    const renderPhotos = (source) => {
        if (source && source.length > 0)
            return source.map((photo) => {
                return <div className="post"><button onClick={(e) => deleteImage(photo)} className="closeImage">X</button> <img className="postImage" src={photo} alt="" key={photo} /></div>;
            });
    };

    const onclickPost = async () => {
        console.log(file)
        const isValid = validateAll()
        console.log(validate);
        if (!isValid) return
        var bodyFormData = new FormData();
        let count = 0;
        if (file && file.files.length > 0) {
            for (let key in file.files) {
                count = count + 1;
                bodyFormData.append('images', file.files[key]);
                if (count == file.files.length) {
                    count = 0;
                    break;
                }
            }
        }
        bodyFormData.append('content', content.content);
        try {
            const res = await createPost(bodyFormData)
            const data = (res && res.data) ? res.data : '';
            console.log(data);
            socket.emit('post', data);
            setContent({
                content: ''
            });
            setFile('');
            setSelectedFiles('');
            navigate('/');
        } catch (error) {
            return error
        }
    }
    const [validate, setValidate] = useState('')
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(content.content)) {
            msg.content = "Vui lòng nhập nội dung bài đăng"
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    // const options = {
    //     render: {
    //         hashtag: renderLink,
    //         mention: renderLink,
    //     },
    // };
    const [display, setDisplay] = useState('-webkit-box');
    const [hidden, setHidden] = useState('Xem thêm');
    const onclickShow = () => {
        setHidden('Rút gọn')
        setDisplay('block')
    }
    const onclickHidden = () => {
        setHidden('Xem thêm')
        setDisplay('-webkit-box')
    }
    const [postDetail, setPostDetail] = useState();
    const getPostHandel = async (postId) => {
        try {
            const res = await getPost(postId)
            const data = (res && res.data) ? res.data : '';
            console.log(data);
            setPostDetail(data);
            setSendComment({
                ...sendComments,
                postId: data.id
            })
        } catch (error) {
            return error
        }
    }
    const [sendComments, setSendComment] = useState({
        content: '',
        postId: ''
    })
    const [comments, setComments] = useState();
    const handleChangeComment = e => {
        const value = e.target.value;
        console.log(sendComments)
        setSendComment({
            ...sendComments,
            [e.target.name]: value
        });
    }
    const sendComment = async () => {
        if (user) {
            try {
                const res = await createComment(sendComments)
                const data = (res && res.data) ? res.data : [];
                const user = await getUserService(data.userId);
                const data1 = (user && user.data) ? user.data : [];
                console.log(data1);
                const result = {
                    ...data,
                    user: data1
                }
                socket.emit('comment', result);
                setSendComment({
                    ...sendComments,
                    content: '',
                });
            } catch (error) {
                return error
            }
        } else {
            alert("bạn phải đăng nhập để bình luận");
        }
    }
    // useEffect(() => {
    //     request.get('/api/csrf-token')
    // }, [])
    useEffect(() => {
        socket.on('comment', (data) => {
            if (postDetail) {
                setPostDetail({
                    ...postDetail,
                    comments: [...postDetail.comments, data]
                })
            }
        });
    }, [postDetail])
    useEffect(() => {
        socket.on('post', (data) => {
            if (posts && posts.length > 0) {
                const newPost = data;
                const updatedPost = [...posts];
                updatedPost.unshift(newPost);
                setPosts(updatedPost);
            }
        });
    }, [posts])
    const UserMenu = (
        <img className="img-dot" src={require('../../assets/home/images/ellipsis.png')} alt="" />
    )
    const handleDeletePost = async (post) => {
        try {
            await deletePost(post.id)
            var array = [...posts]; // make a separate copy of the array
            var index = array.indexOf(post)
            if (index !== -1) {
                array.splice(index, 1);
                setPosts(array)
            }
        } catch (error) {
            return error
        }
    }
    return (
        <>
            <div className="sidebar">
                <div onClick={(e) => setSearchPost({
                    ...searchPost,
                    userId: user.id,
                    limit: 5
                })}
                    className="sidebarRow">
                    <img className="user__avatar"
                        src={user && 'http://localhost:3004/static/avatar/image/' + user.image}
                        alt="" />
                    <h4>{user && user.fullname}</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> emoji_flags </span>
                    <h4>Pages</h4>
                </div>

                <div
                    onClick={(e) => setSearchPost({
                        ...searchPost,
                        userId: '',
                        limit: 5
                    })}
                    className="sidebarRow">
                    <span className="material-icons"> people </span>
                    <h4>People</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> chat </span>
                    <h4>Messenger</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> storefront </span>
                    <h4>Marketplace</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> video_library </span>
                    <h4>Videos</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> expand_more </span>
                    <h4>More</h4>
                </div>
            </div >
            <div class="content-area mt-1 col-4">
                {
                    user &&
                    (
                        <div class="write-post-container mt-3">
                            <div class="user-profile">
                                <img src={user && 'http://localhost:3004/static/avatar/image/' + user.image} alt="" />
                                <div>
                                    <p> {user && user.fullname}</p>
                                    <small>Public <i class="fas fa-caret-down"></i></small>
                                </div>
                            </div>
                            <div class="post-upload-textarea">
                                <textarea name="content" value={content.content} type="input" onChange={handleChangeContent} placeholder={`What's on your mind, ${user && user.fullname} ?`} id="" cols="30" rows="3"></textarea>
                                <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.content}</p>
                                <div class="add-post-links">
                                    <div className="app">
                                        <div>
                                            <input type="file" id="file" multiple onChange={handleImageChange} />
                                            <div className="label-holder">
                                                <label htmlFor="file" className="label">
                                                    <img src={require("../../assets/home/images/photo.png")} alt="" />
                                                </label>
                                            </div>
                                            <div className="result">
                                                {selectedFiles && selectedFiles.length > 0 &&
                                                    renderPhotos(selectedFiles)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Button onClick={(e) => onclickPost()} style={{ width: 'max-content' }}>Đăng</Button>
                                </div>
                            </div>
                        </div>
                    )

                }

                {
                    posts && posts.length > 0 &&
                    posts.map(item => {
                        const day = moment(item.updatedAt).format('DD/MM/YYYY HH:mm:ss')
                        if (!user) {
                            return (
                                <div class="status-field-container write-post-container">
                                    <div class="user-profile-box">
                                        <div class="user-profile">
                                            <img src={'http://localhost:3004/static/avatar/image/' + item.user.image} alt="" />
                                            <div>
                                                <p> {item.user.fullname}</p>
                                                <small>{day}</small>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                                        </div>
                                    </div>
                                    <div class="status-field">
                                        <Linkify as="p">{item.content}</Linkify>
                                        {item.images && item.images.length > 0 &&
                                            item.images.map(img => {
                                                return (
                                                    <img src={'http://localhost:3004/static/post/image/' + img.name} alt="" />
                                                )
                                            })
                                        }
                                    </div>
                                    <div class="post-reaction">
                                        <div class="activity-icons">

                                            <div style={{ cursor: 'pointer' }} onClick={(e) => { getPostHandel(item.id); handleOpen(item.id) }} className="mt-3"><img src={require("../../assets/home/images/comments.png")} alt="" />Comment</div>

                                        </div>
                                        <div class="post-profile-picture">
                                            {/* <img src={require("../../assets/home/images/profile-pic.png ")} alt="" /> <i class=" fas fa-caret-down"></i> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            if (user.id == item.userId) {
                                return (
                                    <div class="status-field-container write-post-container">

                                        <NavDropdown
                                            id="dropdown-basic-button"
                                            title={UserMenu}
                                            key='end'
                                            drop='end'
                                        >
                                            <Dropdown.Item onClick={(e) => handleDeletePost(item)} className="dropdowDot" >Delete</Dropdown.Item>
                                        </NavDropdown>
                                        <div class="user-profile-box">
                                            <div class="user-profile">
                                                <img src={'http://localhost:3004/static/avatar/image/' + item.user.image} alt="" />
                                                <div>
                                                    <p> {item.user.fullname}</p>
                                                    <small>{day}</small>
                                                </div>
                                            </div>
                                            <div>
                                                <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                                            </div>
                                        </div>
                                        <div class="status-field">
                                            <Linkify as="p">{item.content}</Linkify>
                                            {item.images && item.images.length > 0 &&
                                                item.images.map(img => {
                                                    return (
                                                        <img src={'http://localhost:3004/static/post/image/' + img.name} alt="" />
                                                    )
                                                })
                                            }
                                        </div>
                                        <div class="post-reaction">
                                            <div class="activity-icons">

                                                <div style={{ cursor: 'pointer' }} onClick={(e) => { getPostHandel(item.id); handleOpen(item.id) }} className="mt-3"><img src={require("../../assets/home/images/comments.png")} alt="" />Comment</div>

                                            </div>
                                            <div class="post-profile-picture">
                                                {/* <img src={require("../../assets/home/images/profile-pic.png ")} alt="" /> <i class=" fas fa-caret-down"></i> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div class="status-field-container write-post-container">
                                        <div class="user-profile-box">
                                            <div class="user-profile">
                                                <img src={'http://localhost:3004/static/avatar/image/' + item.user.image} alt="" />
                                                <div>
                                                    <p> {item.user.fullname}</p>
                                                    <small>{day}</small>
                                                </div>
                                            </div>
                                            <div>
                                                <a href="#"><i class="fas fa-ellipsis-v"></i></a>
                                            </div>
                                        </div>
                                        <div class="status-field">
                                            <Linkify as="p">{item.content}</Linkify>
                                            {item.images && item.images.length > 0 &&
                                                item.images.map(img => {
                                                    return (
                                                        <img src={'http://localhost:3004/static/post/image/' + img.name} alt="" />
                                                    )
                                                })
                                            }
                                        </div>
                                        <div class="post-reaction">
                                            <div class="activity-icons">

                                                <div style={{ cursor: 'pointer' }} onClick={(e) => { getPostHandel(item.id); handleOpen(item.id) }} className="mt-3"><img src={require("../../assets/home/images/comments.png")} alt="" />Comment</div>

                                            </div>
                                            <div class="post-profile-picture">
                                                {/* <img src={require("../../assets/home/images/profile-pic.png ")} alt="" /> <i class=" fas fa-caret-down"></i> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })
                }
                <button onClick={(e) => handleLoadMore()} type="button" class="btn-LoadMore" onclick="LoadMoreToggle()">Load More</button>
            </div >
            <div class="right-sidebar mt-3 col-4">
                <div class="heading-link">
                    <h4>Events</h4>
                    <a href="">See All</a>
                </div>

                <div class="events">
                    <div class="left-event">
                        <h4>13</h4>
                        <span>august</span>
                    </div>
                    <div class="right-event">
                        <h4>Social Media</h4>
                        <p> <i class="fas fa-map-marker-alt"></i> wisdom em Park</p>
                        <a href="#">More Info</a>
                    </div>
                </div>
                <div class="events">
                    <div class="left-event">
                        <h4>18</h4>
                        <span>January</span>
                    </div>
                    <div class="right-event">
                        <h4>Mobile Marketing</h4>
                        <p><i class="fas fa-map-marker-alt"></i> wisdom em Park</p>
                        <a href="#">More Info</a>
                    </div>
                </div>

                <div class="heading-link">
                    <h4>Advertisement</h4>
                    <a href="">Close</a>
                </div>
                <div class="advertisement">
                    <img src={require("../../assets/home/images/advertisement.png")} class="advertisement-image" alt="" />
                </div>

                <div class="heading-link">
                    <h4>Conversation</h4>
                    <a href="">Hide Chat</a>
                </div>

                <div class="online-list">
                    <div class="online">
                        <img src={require("../../assets/home/images/member-1.png")} alt="" />
                    </div>
                    <p>Alison Mina</p>
                </div>

                <div class="online-list">
                    <div class="online">
                        <img src={require("../../assets/home/images/member-2.png")} alt="" />
                    </div>
                    <p>Jackson Aston</p>
                </div>
                <div class="online-list">
                    <div class="online">
                        <img src={require("../../assets/home/images/member-3.png")} alt="" />
                    </div>
                    <p>Samona Rose</p>
                </div>
            </div>
            {/* </div> */}
            <Modal
                className="modal-comment"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ borderRadius: '50px !important' }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <div className="title-comment">
                            {
                                postDetail
                                    ? ('Bài viết của' + postDetail.user.fullname)
                                    : ''
                            }
                        </div>
                    </Typography>
                    <Typography style={{ display: display }} id="modal-modal-description" sx={{ mt: 2 }}>
                        <Linkify as="p">{postDetail ? postDetail.content : ''}</Linkify>
                    </Typography>
                    {

                        postDetail && postDetail.content.length > 200 || display === '-webkit-box' ?
                            (<span onClick={(e) => onclickShow()} style={{ cursor: 'pointer' }}>{hidden}</span>)
                            :
                            (<span onClick={(e) => onclickHidden()} style={{ cursor: 'pointer' }}>{hidden}</span>)
                    }
                    {
                        postDetail && postDetail.images.length > 0 &&
                        postDetail.images.map(item1 => {
                            return (
                                <img className="mt-2" style={{ width: '100%' }} src={'http://localhost:3004/static/post/image/' + item1.name} alt="" />
                            )
                        })
                    }
                    <div>
                        <section class="msger">
                            <header class="msger-header">
                                <div class="msger-header-title">
                                    <i class="fas fa-comment-alt"></i> Comment
                                </div>
                                <div class="msger-header-options">
                                    <span><i class="fas fa-cog"></i></span>
                                </div>
                            </header>

                            <main class="msger-chat">
                                {
                                    postDetail && postDetail.comments.length > 0 ?
                                        postDetail.comments.map(item2 => {
                                            const day = moment(item2.updatedAt).format('DD/MM/YYYY HH:mm:ss')
                                            if (user && item2.userId != user.id) {
                                                return (<div class="msg left-msg">
                                                    <div class="user-profile">
                                                        <img src={'http://localhost:3004/static/avatar/image/' + item2.user.image} alt="" />
                                                    </div>
                                                    <div class="msg-bubble">
                                                        <div class="msg-info">
                                                            <div class="msg-info-name">{item2.user.fullname}</div>
                                                            <div class="msg-info-time">{day}</div>
                                                        </div>

                                                        <div class="msg-text">
                                                            {item2.content}
                                                        </div>
                                                    </div>
                                                </div>)
                                            }
                                            else {
                                                return (
                                                    <div class="msg right-msg">
                                                        <div class="user-profile1">
                                                            <img src={'http://localhost:3004/static/avatar/image/' + item2.user.image} alt="" />
                                                        </div>

                                                        <div class="msg-bubble">
                                                            <div class="msg-info">
                                                                <div class="msg-info-name">{item2.user.fullname}</div>
                                                                <div class="msg-info-time">{day}</div>
                                                            </div>

                                                            <div class="msg-text">
                                                                {item2.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                        :
                                        (
                                            <img src={require('../../assets/home/images/nocomment.jpg')} alt="" />
                                        )
                                }
                            </main>

                            <form class="msger-inputarea">
                                <input onChange={handleChangeComment} value={sendComments.content} name="content" type="text" class="msger-input" placeholder="Enter your message..." />
                                <button onClick={(e) => sendComment()} type="button" class="msger-send-btn">Send</button>
                            </form>
                        </section>
                    </div>
                </Box>
            </Modal>

        </>
    )
}

export default Home;