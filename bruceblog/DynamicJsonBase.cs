using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bruceblog
{
    public class DynamicJsonBase
    {
        private string _jblogtitle;
        private string _jblogauthor;
        private string _jblogcontent;
        private string _jblogpubtime;    
        public string JblogTitle
        {
            set { _jblogtitle = value; }
            get { return _jblogtitle; }
        }
        public string JblogAuthor
        {
            set { _jblogauthor = value; }
            get { return _jblogauthor; }
        }
        public string JblogContent
        {
            set { _jblogcontent = value; }
            get { return _jblogcontent; }
        }
        public string JblogPubTime
        {
            set { _jblogpubtime = value; }
            get { return _jblogpubtime; }
        }   
        public DynamicJsonBase(string jblogtitle, string jblogauthor, string jblogcontent, string jblogpubtime)
        {
            _jblogtitle = jblogtitle;
            _jblogauthor = jblogauthor;
            _jblogcontent = jblogcontent;
            _jblogpubtime = jblogpubtime;
        }
    }
}