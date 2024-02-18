// pages/Producttable/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/ProductTable.module.css'; // Import your custom CSS file

const ProductTable = () => {
  const { addToast } = useToasts();
  const [products, setProducts] = useState([]);
  const [csvFile, setcsvFile] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
    }
  };

  const handleRemove = async (productId) => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    };

    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: headersList
    });

    if (response.status === 201) {
      addToast("Product removed successfully", { appearance: 'success' });
      fetchProducts();
    } else {
      addToast('Error removing product', { appearance: 'error' });
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light bg-light px-5 ${styles.customNavbar}`}>
        <a className="navbar-brand" href="#">Admin</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav">
          <Link className="nav-item nav-link" href="/Producttable">Product</Link>
          <Link className="nav-item nav-link" href="/settings">Setting</Link>
        </div>
      </nav>
      <div className={`container mt-4 ${styles.customContainer}`}>
        <div className={`d-flex justify-content-between mb-5 ${styles.header}`}>
          <h2 className="">Product List</h2>
          <input type="file" id="csvFile" name="csvFile" accept=".csv" onChange={(e) => {
            setcsvFile(e.target.files[0]);
          }} />
          <div className={`btn btn-primary pt-2 ${styles.uploadBtn}`} onClick={() => {
            const formData = new FormData();
            formData.append('csvFile', csvFile);

            fetch('/api/csvupload', {
              method: 'POST',
              body: formData,
            })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error('Error:', error));
          }}>Upload CSV</div>
          <Link href={`/ProductForm`} className={`btn btn-primary pt-2 ${styles.addNewBtn}`}>Add New</Link>
        </div>
        <table className={`table ${styles.productTable}`}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col text-end" style={{ textAlign: 'end' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product._id}>
                <td><b>{index + 1}</b></td>
                <td>
                  <img src={product.images} className={`img-fluid ${styles.productImage}`} alt={`Product ${index + 1}`} />
                </td>
                <td><b>{product.Title}</b></td>
                <td>
                  <div className={`d-flex justify-content-end ${styles.actionButtons}`}>
                    <button onClick={() => handleRemove(product._id)} className={`btn btn-danger btn-sm ${styles.removeBtn}`}>
                      Remove
                    </button>
                    <Link href={`/ProductForm/${product._id}`} className={`btn btn-success btn-sm mx-2 ${styles.editBtn}`} onClick={() => {
                      localStorage.setItem("d1", JSON.stringify(product))
                    }}>
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
