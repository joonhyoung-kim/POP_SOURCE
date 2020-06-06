using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

namespace TU.Core.Transfer
{

    public class TRequest 
    {
        /// <summary>
        /// 요청자 토큰ID
        /// </summary>
        public string TokenId { get; set; } = "";
        /// <summary>
        /// 요청 사이트ID
        /// </summary>
        public string SiteId { get; set; } = "";
        /// <summary>
        /// 요청 메뉴
        /// </summary>
        public string MenuId { get; set; } = "";
        /// <summary>
        /// 요청 언어
        /// </summary>
        public string Language { get; set; } = "";
        /// <summary>
        /// 요청 시스템
        /// </summary>
        public string System { get; set; } = "";
        /// <summary>
        /// 요청자 시스템 버전
        /// </summary>
        public string Version { get; set; } = "";
        /// <summary>
        /// 요청자 PC OS
        /// </summary>
        public string OS { get; set; } = "";
        /// <summary>
        /// 요청자 IP주소
        /// </summary>
        public string IPAddress { get; set; } = "";
        /// <summary>
        /// 요청 사용자ID
        /// </summary>
        public string UserId { get; set; } = "";
        /// <summary>
        /// 요청 사용자이름
        /// </summary>
        public string UserName { get; set; } = "";
        /// <summary>
        /// 요청 ID
        /// </summary>
        public string QueryId { get; set; } = "";
        /// <summary>
        /// 서버 요청 데이터
        /// </summary>
        public Dictionary<int, TParameter> Data { get; set; }

        public TRequest()
        {

        }

        /// <summary>
        /// 기초 메시지 생성
        /// </summary>
        /// <returns></returns>
        public static TRequest MakeTRequest(string menuId, string queryId, Collection<TParameter> paramList = null)
        {
            TRequest data = new TRequest();
            data.TokenId = "";
            //data.Language = LoginUser.Instance.MOMConfig.Language;
            //data.System = LoginUser.Instance.MOMConfig.System;
            data.Version = Environment.Version.ToString();
            data.OS = Environment.OSVersion.ToString();
            //data.IPAddress = LoginUser.Instance.LocalIP;
            //data.UserId = LoginUser.Instance.MOMConfig.UserId;
            //data.UserName = LoginUser.Instance.MOMConfig.UserName;
            data.MenuId = menuId;
            data.QueryId = queryId;

            if (paramList == null) data.Data = new Dictionary<int, TParameter>();
            else data.Data = paramList.ToDictionary(p => p.Seq);

            return data;
        }
       
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("[ MESSAGE INFO ] ");
            sb.AppendLine($"[ TOKEN     ] { TokenId }");
            sb.AppendLine($"[ SITEID    ] { SiteId }");
            sb.AppendLine($"[ MENUID    ] { MenuId }");
            sb.AppendLine($"[ LANGUAGE  ] { Language}");
            sb.AppendLine($"[ SYSTEM    ] { System }");
            sb.AppendLine($"[ VERSION   ] { Version }");
            sb.AppendLine($"[ OS        ] { OS }");
            sb.AppendLine($"[ IP        ] { IPAddress }");
            sb.AppendLine($"[ USERID    ] { UserId }");
            sb.AppendLine($"[ USERNAME  ] { UserName }");
            sb.AppendLine($"[ QUERYID   ] { QueryId }");
            sb.AppendLine("[DATALIST] ");
            if (Data != null)
            {
                for (int row = 0; row < Data.Count; row++)
                {
                    foreach (TItem para in Data[row])
                    {
                        sb.AppendLine($"- { row } [ { para.DataType } ]{ para.Key }:{ para.Value.ToString() }");
                    }
                }
            }
            return sb.ToString();
        }
    }
}