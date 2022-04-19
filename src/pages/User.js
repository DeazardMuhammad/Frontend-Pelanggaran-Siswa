import { useState, useEffect } from "react";
import  axios  from "axios";
import { Toast } from "bootstrap";
import { Modal } from "bootstrap";

export default function User(){
    let [user, setUser] = useState([])
    let [idUser, setIDUser] = useState("")
    let [username, setUsername] = useState("")
    let [nama, setNama] = useState("")
    let [password, setPassword] = useState("")
    let [action, setAction] = useState("")
    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)
 
    /**prepare token */
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
     headers: {
         Authorization: `Bearer ${token}`
     }
 }

 /** get data user from backend */
 let getData = () => {
    let endpoint = `http://localhost:8080/user`
    /**sending data */
    axios.get(endpoint, authorization)
        .then(response => {
            /** simpan ke state user */
            setUser(response.data)
        })
        .catch(error => console.log(error))
}
/** create function to show toast */
let showToast = message => {
    let myToast = new Toast(
        document.getElementById(`myToast`),
        {
            autohide: true
        }
    )
    /** perintah untuk mengisi state `message` */
    setMessage(message)

    /** show Toast */
    myToast.show()
}
let tambahData = () => {
    /* open modal */
    /** display modal */
    modal.show()

    /** mengosongkan inputan form nya */
    setIDUser(0)
    setUsername("")
    setNama("")
    setPassword("")
    setAction(`insert`)
}
let editData = item => {
    /** display modal */
    modal.show()

    /** isi form sesuai data yang dipilih */
    setIDUser(0)
    setUsername("")
    setNama("")
    setPassword("")
    setAction(`insert`)
}
let simpanData = ev => {
    ev.preventDefault()
    /** close modal */
    modal.hide()
    if (action === "insert") {
        let endpoint = `http://localhost:8080/user`
        let request = new FormData()
        request.append(`nama`, nama)
        request.append(`username`, username)
        request.append(`password`, password)


        /** sending data */
        axios.post(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                /** refresh data user */
                getData()
            })
            .catch(error => console.log(error))
            
    } else if (action === "edit") {
        let endpoint = `http://localhost:8080/user/${idUser}`
        let request = new FormData()
        request.append(`nama`, nama)
        request.append(`username`, username)
        request.append(`password`, password)

        /** sending data utk edit data */
        axios.put(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                /** refresh data user */
                getData()
            })
            .catch(error => console.log(error))
    }
}

let hapusData = item => {
    if (window.confirm(`Yakin di hapus nih bang ?`)) {
        let endpoint = `http://localhost:8080/user/${item.id_user}`

        /** sending data */
        axios.delete(endpoint, authorization)
            .then(response => {
                showToast(response.data.message)
                /** refresh data user */
                getData()
            })
            .catch(error => console.log(error))
    }
}
useEffect(() => {
    let myModal = new Modal(document.getElementById("modal-user")
    )
    setModal(myModal)
    getData()
}, [])
return (
    <div className="container-fluid">

        {/* start component Toast  */}
        <div className="position-fixed top-0 end-0 p-3"
            style={{ zIndex: 11 }}>
            <div className="toast bg-light" id="myToast">
                <div className="toast-header bg-info text-light">
                    <strong>Message</strong>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
        {/* end component Toast */}

        <div className="card m-2">
            <div className="card-header" style={{ background: `#CE49BF` }}>
                <h4 className="text-white">
                    Daftar User
                </h4>
            </div>

            <div className="card-body" style={{background: `#F190B7`}}>
                <ul className="list-group" >
                    {user.map(item => (
                        <li className="list-group-item" style={{background: `#FBD6D2`}}>
                            <div className="row">
                                <div className="col-2">
                                    <small className="text-info">
                                        ID User
                                    </small>
                                    <h5>{item.id_user}</h5>
                                </div>
                                <div className="col-2">
                                    <small className="text-info">
                                        Nama
                                    </small>
                                    <h5>{item.nama_user}</h5>
                                </div>
                                <div className="col-2">
                                    <small className="text-info">
                                        Username
                                    </small>
                                    <h5>{item.username}</h5>
                                </div>
                                <div className="col-4">
                                    <small className="text-info">
                                        Password
                                    </small>
                                    <h5>{item.password}</h5>
                                </div>
                                <div className="col-2">
                                    <small className="text-info">
                                        Option
                                    </small>
                                    <br />
                                    <button className="btn btn-sm btn-info mx-1"
                                        onClick={() => editData(item)}>
                                        <span className="fa fa-edit"></span>
                                    </button>
                                    <button className="btn btn-sm btn-danger mx-1"
                                    onClick={() => hapusData(item)}>
                                        <span className="fa fa-trash"></span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* button tambah */}
                <button className="btn btn-sm btn-success my-2"
                    onClick={() => tambahData()}>
                    <span className="fa fa-plus"></span> Tambah Data
                </button>

                {/* buat modal yg isinya form untuk data user */}
                <div className="modal" id="modal-user">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-danger">
                                <h4 className="text-light">
                                    Form User
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => simpanData(ev)}>
                                    Nama
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        required
                                        onChange={e => setNama(e.target.value)}
                                        value={nama} />

                                    Username
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        required
                                        onChange={e => setUsername(e.target.value)}
                                        value={username} />

                                    Password
                                    <input
                                        type="password"
                                        className="form-control mb-2"
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                        value={password} />


                                    <button className="btn btn-success" type="submit">
                                        <span className="fa fa-check"></span> Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}