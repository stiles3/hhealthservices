import React, { Component } from 'react'
import { Table, Input, Button, Icon, Menu, Dropdown,Modal, Form, Radio} from 'antd';
import Highlighter from 'react-highlight-words'
import axios from 'axios'
import NewUser from './NewUser'

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Button >Edit</Button>
    </Menu.Item>
    <Menu.Item key="1">
      <Button>Delete</Button>
    </Menu.Item>
    <Menu.Divider />
  </Menu>
);

export class UsersList extends Component {
     state = {
      searchText: '',
      pagination: {},
      loading: false,
      data:[],
      visible: false,
    }

     componentDidMount() {
        this.fetch();
      }

     handleTableChange = (pagination, filters, sorter) => {
         const pager = {...this.state.pagination}
         pager.current = pagination.current
         this.setState({
             pagination: pager,
         })

         this.fetch({
             results: pagination.pageSize,
             page:pagination.current,
             sortField: sorter.field,
             sortOrder: sorter.order,
             ...filters
         })
     }

     fetch = (params = {}) => {
         console.log('params:', params)
         this.setState({loading:true})
         var headers = {
            'Content-Type': 'application/json'
          }
        
          var data = {
           results: 10,
           ...params
        }
         axios.get('http://localhost:4000/users', data, headers)
         .then(res => {
              const pagination = {...this.state.pagination}
             pagination.total = 200
             this.setState({
                 loading: false,
                 data:    res.data,
                          pagination
             }) 
             console.log(this.state.data)
         })
     }
       
   
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm,  clearFilters}) => (
            <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>  
        ),

        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
          ),

          onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
       
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                  setTimeout(() => this.searchInput.select());
                }
              },
              render: text => (
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[this.state.searchText]}
                  autoEscape
                  textToHighlight={text.toString()}
                />
              ),
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

    render() {
     
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
                fixed: 'left',
                width:'10%'
            },
            {
                title: 'Address',
                dataIndex: 'residential_address',
                key: 'address',
                ...this.getColumnSearchProps('residential_address'),
                width:'10%'
            },
            {
                title: 'D.O.B',
                dataIndex: 'date_of_birth',
                key: 'd.o.b',
                ...this.getColumnSearchProps('date_of_birth'),
                width:'5%',
            },
            {
                title: 'Occupation',
                dataIndex: 'occupation',
                key: 'occupation',
                width:'10%',
                ...this.getColumnSearchProps('occupation')
            },
            {
                title: 'Phone Number',
                dataIndex: 'phone_number',
                key: 'phone_number',
                width:'10%',
               ...this.getColumnSearchProps('phone_number')
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width:'10%',
                ...this.getColumnSearchProps('email')
            },
            {
              title: 'Gender',
              dataIndex: 'gender',
              key: 'gender',
              width:'10%',
             // ...this.getColumnSearchProps('gender')
          },
            {
                title: 'Marital Status',
                dataIndex: 'marital_status',
                key: 'marital_status',
                width:'10%',
                ...this.getColumnSearchProps('marital_status')
            },
            {
                title: 'Cash/Check',
                dataIndex: 'cash_check',
                key: 'cash_check',
                width:'10%',
                ...this.getColumnSearchProps('cash/check')
            },
            {
                title: 'Monthly Income',
                dataIndex: 'income_monthly',
                key: 'income_monthly',
                width:'10%',
                ...this.getColumnSearchProps('income'),
                
            },
            {
              title: 'Edit',
              dataIndex: 'income_monthly',
              key: 'income_monthly',
              width:'5%',
              fixed:'right',
              render: ()=>{
                return(<Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
               <Icon type="menu" />
                </a>
              </Dropdown>)
                
              },
              
            
          }
        ]
        return (
          <div>
  <NewUser/>
    <br/>
             <Table 
              columns={columns}
              rowKey={ this.state.data.toString()}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              scroll={{ x: 1500, y: 300 }}
              />
          </div>
          
        )
    }
}

export default UsersList
