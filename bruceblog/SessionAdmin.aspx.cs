using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace bruceblog.js
{
    public partial class SessionAdmin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["loginpnum"].ToString() == "")
            {
                Response.Write("notlogin");
            }
            else
            {
                Response.Write("yeslogin");
            }
        }
    }
}