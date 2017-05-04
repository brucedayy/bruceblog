using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bruceblog
{
    public class DynamicJson:DynamicJsonBase
    {
        private List<comments> _jblogcomments;
        public List<comments> JblogComments
        {
            set { _jblogcomments = value; }
            get { return _jblogcomments; }
        }
        public DynamicJson(string jblogtitle, string jblogauthor, string jblogcontent, string jblogpubtime,List<comments> jblogcomments)
            :base(jblogtitle,jblogauthor,jblogcontent,jblogpubtime)
        {
            this._jblogcomments = jblogcomments;
        }
    }
}