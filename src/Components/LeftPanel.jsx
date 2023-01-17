import React, { useEffect, useState } from 'react'
import { toast } from 'react-toast'
import { Card, CardBody,Button, CardFooter, CardText, Col,Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,} from 'reactstrap'
import { getAllCountries } from '../services/country-service'
import { getAllCustomers ,deleteCustomerById,updatedUserById,createCustomer} from '../services/customer-service'
import { getAllIndustries } from '../services/industry-service'


function LeftPanel() {
 
 const [customers,setCustomeres] = useState()
 const [updatedCustomer,setUpdatedCustomer] = useState({
  customerCode:'',
  name:'',
  address:''
 },[])

// load all customers

 useEffect(()=>{
  getAllCustomers().then(data=>{
    console.log("inside get ALl customers function")
    toast.success("Customers fetched successfully")
    setCustomeres([...data])
    console.log(data) 

  }).catch(error=>{
    toast.error("somthing went wrong "+error);
  })

 },'')

 // delete a customer
  const deleteCustomer=(customerCode)=>{
    console.log(customerCode)
  deleteCustomerById(customerCode).then(data=>{
        alert("customer deleted succesfull" +data);
  }).catch(error=>{
    console.log("something went wrong "+error)
  })
 };

 // update user function
 const updateUser=(customer)=>{
  updatedUserById(customer).then(data=>{
    console.log(customer.customerCode)
    console.log(customer)
    alert("customer updated successfully")
  }).catch(error=>{
    alert("something went wrong please try again"+error)
  })
 }

// code for model to update customer

const [modal, setModal] = useState(false)
const toggle=(id)=>{
  setModal(!modal)
  setUpdatedCustomer({...updatedCustomer,customerCode:id})
}

const handleChange =(event,property)=>{
  setUpdatedCustomer({...updatedCustomer,[property]:event.target.value})
}

// Modal to add user
const [modal1,setModal1] =useState(false)
const toggle1=()=>{
  setModal1(!modal1)
}

// function for getting all the countries
const[countires,setCountries] = useState()
useEffect(()=>{
  getAllCountries().then(data=>{
    console.log("inside countires fetching")
    setCountries([...data])
    console.log(countires)
  }).catch(error=>{
      alert("something went wrong while fetching countries"+error)
  })
},'')


// function gor getting all the industries
const [industries,setIndustries] = useState()
useEffect(()=>{
  getAllIndustries().then(data=>{
    console.log("inside industries fetching")
        setIndustries([...data])
        console.log(industries)
  }).catch(error=>{
    alert("something went wrong while fetching industries"+error)
  })
},'')

// object to add a new customer
const [newCustomer,setNewCustomer] = useState()

 // filed change for add a customer
 const fieldChanged =(event)=>{
   setNewCustomer({...newCustomer,[event.target.name]:event.target.value})

}

// function to create a new customer
const addCustomer =()=>{
  console.log(newCustomer.industryId)
  createCustomer(newCustomer).then(data=>{
    alert("customer added successfully"+data)
  }).catch(error=> {
     alert("something went wrong"+error)
  })
}
  return (
    <div>
        <h4>All Customers</h4><Button color='primary' className='mb-3' onClick={()=> toggle1()}>Insert Customer</Button>
        {
          customers && customers.map((customer)=>{
           return(
            <Card key={customer.customerCode}>
            <CardBody>
              <CardText>Customer Code {customer.customerCode}</CardText>
              <CardText>Name  {customer.name}</CardText>
              <CardText>Address {customer.address}</CardText>
              <CardText>Country {customer.country.countryName}</CardText>
              <CardText>Industry {customer.industry.industryName}</CardText>
            </CardBody>
            <CardFooter>
              <Col>
              <Button color="danger"
                onClick={()=>deleteCustomer(customer.customerCode)}
               >Delete
             </Button>

            <Button color="warning"
             className='ml-5'
             onClick={()=>toggle(customer.customerCode)}
             >
                  Update
           </Button>
              </Col>             
            </CardFooter>
           </Card>
           )

          })
        }

 {/* modal to update customer {...args} */}

<Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Update User</ModalHeader>
        <ModalBody>
            <Label>Name</Label>
            <Input type ="text"
             name='name'
             onChange ={(e)=> handleChange(e,"name")}
            ></Input>
            <Label>Address</Label>
            <Input type ="text"
            name="address"
            onChange={(e)=>handleChange(e,"address")}
            ></Input>
        </ModalBody>
        <ModalFooter>
          
          <Button color="primary"  onClick={()=>updateUser(updatedCustomer)}  >
           Update
          </Button>
        </ModalFooter>
      </Modal>
    {/* Modal to insert a new Customer */}

    <Modal isOpen={modal1} toggle={toggle1}>

      <ModalHeader toggle={toggle1}>
            Add a new User
      </ModalHeader>
      <ModalBody>
        <Label>
              Name
        </Label>
        <Input type='text'
        id='name'
        name='name'
        onChange={fieldChanged}
        />
        <Label>
              Address
        </Label>
        <Input type='text'
        id='address'
        name='address'
        onChange={fieldChanged}
        />
        
  
              {/* input for industries  */}
                <Label for="industry"className='mt-3' >Customer Industry</Label>
                <Input type="select"
                id ="industry"
                placeholder="enter here" 
                className="rounded-0" 
                name="industryId"
                onChange={fieldChanged}
                defaultValue={0}
                >
                    <option disabled value={0}>---select industry--</option>
                   {
                      industries && industries.map((industry)=>(
                        <option value={industry.idustryId} key={industry.idustryId}>
                           {industry.industryName}
                        </option>
                    ))
                   }
                </Input>

            {/* input for countries  */}

            <Label for ="country"className='mt-3' > Customer Country</Label>
            <Input type='select'
              id='country'
              placeholder='enter here'
              className='rounded-0'
              name='countryId'
              onChange={fieldChanged}
              defaultValue={0}
            >
            <option disabled value={0}>---select country---</option>
            {
              countires && countires.map((country)=>(
                <option value={country.countryId} key={country.countryId}>
                      {country.countryName}
                </option>
              ))
            }           
            </Input>
      </ModalBody>
      <ModalFooter>

          <Button color='primary' onClick={addCustomer} >
            Add Customer
          </Button>
      </ModalFooter>
    </Modal>


    </div>
  )
}

export default LeftPanel