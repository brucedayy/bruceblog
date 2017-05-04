using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace bruceblog
{
    public class users
    {
        static readonly string conStr = @"Data Source=daju;Initial Catalog=bruceblog;Integrated Security=True";
        private int _uid;
        private string _phoneNumber;
        private string _password;
        private string _nickName;
        private string _emailAddress;
        public int Uid
        {
            set { _uid = value; }
            get { return _uid; }
        }
        public string PhoneNumb
        {
            set { _phoneNumber = value; }
            get { return _phoneNumber; }
        }
        public string Password
        {
            set { _password = value; }
            get { return _password; }
        }
        public string NickName
        {
            set { _nickName = value; }
            get { return _nickName; }
        }
        public string EmailAddress
        {
            set { _emailAddress = value; }
            get { return _emailAddress; }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="phoneNumber"></param>
        /// <param name="password"></param>
        /// <param name="nickName"></param>
        /// <param name="emailAddress"></param>
        public users(int uid, string phoneNumber, string password, string nickName, string emailAddress)
        {
            _uid = uid;
            _phoneNumber = phoneNumber;
            _password = password;
            _nickName = nickName;
            _emailAddress = emailAddress;
        }
        public users() { }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<users> GetAllUSer()
        {
            List<users> listUser = new List<users>();
            string cmdSelect = "SELECT uid,phonenumber,password,nickname,emailaddress FROM users";
            try {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand(cmdSelect, con);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        listUser.Add(new users(
                           reader.GetInt32(0), reader.GetString(1),
                           reader.GetString(2), reader.GetString(3),
                           reader.GetString(4)
                            ));
                    }
                    con.Close();
                    return listUser;                    
                }
            }catch(SqlException e)
            {
                throw;
            }
        }

        public string GetUserNickNameByPhone(string pnum)
        {
            string nickname;
            string cmdSelect = "SELECT nickname FROM users WHERE phonenumber='"+pnum+"'";
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand(cmdSelect, con);
                    SqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    nickname = reader.GetString(0);                                        
                    con.Close();
                    return nickname;
                }
            }
            catch (SqlException e)
            {
                throw;
            }
        }

        public bool AddUser(string phoneNumber, string password, string nickName, string emailAddress)
        {
            string cmdInsert = "INSERT INTO users(phonenumber,password,nickname,emailaddress) VALUES('" + phoneNumber +
                "','" + password + "','" + nickName + "','" + emailAddress + "')";
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand(cmdInsert, con);
                    cmd.ExecuteNonQuery();                                                           
                    con.Close();
                    return true;
                }
            }
            catch (SqlException e)
            {
                throw;
            }
        }
    }
}