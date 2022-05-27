import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

type Data = {
  id?: string;
  model?: string;
  makeYear?: number;
  operatingSystems?: string;
  screenHeight?: number;
  screenWidth?: number;
  price?: number;
};

const Form = () => {
  const [inputs, setInputs] = useState({});
  const [formData, setFormData] = useState<Data[]>([]);
  const [sortStatus, setSortStatus] = useState(false);

  const handelInput = (e: any) => {
    console.log(e);
    setInputs({ ...inputs, [e.target.name]: e.target.value, id: uuid });
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('http://localhost:8080/data')
      .then((response: AxiosResponse<Data[]>) => {
        const { data } = response;
        setFormData(data);
      })
      .catch((e) => console.log(e));
  };

  const submit = (e: any) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/data', inputs)
      .then(getData)
      .catch((e) => console.log(e));
    console.log(formData);
  };

  const sort = (e: any) => {
    // console.log(e.target.value);
    let value = e.target.value;
    if (value == 'default') {
      formData.sort((a: any, b: any) => +a.id - +b.id);
      {
        sortStatus ? setSortStatus(false) : setSortStatus(true);
      }
    } else if (value == 'htl') {
      formData.sort((a: any, b: any) => +b.price - +a.price);
      {
        sortStatus ? setSortStatus(false) : setSortStatus(true);
      }
    } else if (value == 'lth') {
      formData.sort((a: any, b: any) => +a.price - +b.price);
      {
        sortStatus ? setSortStatus(false) : setSortStatus(true);
      }
    } else if (value == 'old') {
      formData.sort((a: any, b: any) => +a.makeYear - +b.makeYear);
      {
        sortStatus ? setSortStatus(false) : setSortStatus(true);
      }
    } else if (value == 'new') {
      formData.sort((a: any, b: any) => +b.makeYear - +a.makeYear);
      {
        sortStatus ? setSortStatus(false) : setSortStatus(true);
      }
    }
  };



  return (
    <>
      <form
        onSubmit={submit}
        style={{
          margin: 'auto',
          width: '20em',
          
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
         
        }}>
        <input
          placeholder='Model'
          type='text'
          name='model'
          onChange={handelInput}
        />
        <input
          placeholder='Make year'
          type='number'
          name='makeYear'
          onChange={handelInput}
        />
        <input
          placeholder='Operating system'
          type='text'
          name='operatingSystems'
          onChange={handelInput}
        />
        <input
          placeholder='Screen Height'
          type='number'
          name='screenHeight'
          onChange={handelInput}
        />
        <input
          placeholder='Screen Width'
          type='number'
          name='screenWidth'
          onChange={handelInput}
        />
        <input
          placeholder='Price'
          type='number'
          name='price'
          onChange={handelInput}
        />
        <input type='submit' value='Submit' />
      </form>
      <div>
        <h2>Laptop Model List</h2>
        <select name='' id='' onChange={sort}>
          <option value='default'>Sort By</option>
          <option value='htl'>Price H-To-L</option>
          <option value='lth'>Price L-To-H</option>
          <option value='old'>Old First</option>
          <option value='new'>New First</option>
        </select>

        <div>
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Model</th>
                <th>Year</th>
                <th>Operating System</th>
                <th>Screen Height</th>
                <th>Screen Width</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((t) => (
                <tr key={t.id}>
                  <td>{t.model}</td>
                  <td>{t.makeYear}</td>
                  <td>{t.operatingSystems}</td>
                  <td>{t.screenHeight}</td>
                  <td>{t.screenWidth}</td>
                  <td>{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Form;
