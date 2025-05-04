import * as React from 'react'
import KModal from './modal'
import KForm from './form'
import { AuthService } from '../services/auth'

export function ChangePassword({show=false, setShow}){
    const ChangePasswordForm = [
        {
            type:"password",
            name:"pwd",
            placeholder:"Current Password"
        },
        {
            type:"password",
            name:"cpwd",
            placeholder:"New Password",
            rules:[{
                minLength: 8,
                errorMessage:"ad"
            }]
        },
        {
            type:"password",
            name:"npwd",
            placeholder:"Confirm new Password"
        }
    ]
    const onSubmit = (prop) =>{
        AuthService.changePassword(prop).then((r)=>{

        })
    }
    return(
        <div>
            <KModal showOk={false} setOpen={setShow} open={show} title='Change password'>
                <KForm onSubmit={onSubmit} showSubmitButton submitText='Change password' showLabels  form={ChangePasswordForm}/>
            </KModal>
        </div>
    )
}