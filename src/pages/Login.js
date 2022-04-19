import { useState } from "react"
import axios from "axios"
// axios digunakan untuk proses transfer data dari frontend ke backend

export default function Login() {
    // define state to stone username and password
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let LoginProcess = ev => {
        ev.preventDefault()
        // akses ke backend utk proses login
        // method: POST
        // endpoint: http://localhost:8080/user/auth
        // request: username and password
        // reponse: logged and token
        let request = {
            username: username,
            password: password
        }

        let endpoint = `http://localhost:8080/user/auth`

        // sending data
        axios.post(endpoint, request)
        .then(response => {
            if (response.data.logged === true) {
                let token = response.data.token
                // storage
                localStorage.setItem(`token-pelanggaran`, token)
                alert(`Login Berhasil`)
            } else {
                alert(`Username and Password Invalid`)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header" style={{ background: `maroon` }}>
                    <h4 className="text-white">
                        Sign In
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={ev => LoginProcess(ev)}>
                        <h5>Username</h5>
                        <input type={`text`} className="form-control mb-2"
                            required
                            value={username}
                            onChange={(ev) => setUsername(ev.target.value)}
                        />

                        <h5>Password</h5>
                        <input type={`password`} className="form-control mb-2"
                            required
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />

                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}