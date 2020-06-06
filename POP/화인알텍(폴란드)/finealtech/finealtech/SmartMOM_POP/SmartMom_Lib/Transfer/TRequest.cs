using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace SmartMom_Lib
{

    // 아래 샘플에 나타낸 것처럼 데이터 계약을 사용하여 복합 형식을 서비스 작업에 추가합니다.
    [KnownType(typeof(List<TParameter>))]
    [KnownType(typeof(TRequest))]
    [DataContract]
    public class TRequest 
    {
        /// <summary>
        /// 요청자 토큰ID
        /// </summary>
        [DataMember]
        public string TokenId { get; set; } = "";
        /// <summary>
        /// 인증만료시간
        /// </summary>
        [DataMember]
        public DateTime ExpiredDateTime { get; set; } = DateTime.MinValue;
        /// <summary>
        /// ClientId ( Macaddress )
        /// </summary>
        [DataMember]
        public string ClientId { get; set; } = "";
        /// <summary>
        /// 사업부코드
        /// </summary>
        [DataMember]
        public string DivisionCD { get; set; } = "";
        /// <summary>
        /// 회사코드
        /// </summary>
        [DataMember]
        public string CompanyCD { get; set; } = "";
        /// <summary>
        /// 요청 메뉴
        /// </summary>
        [DataMember]
        public string MenuId { get; set; } = "";
        /// <summary>
        /// 요청 언어
        /// </summary>
        [DataMember]
        public string Language { get; set; } = "";
        /// <summary>
        /// 요청 시스템
        /// </summary>
        [DataMember]
        public string System { get; set; } = "";
        /// <summary>
        /// 요청자 시스템 버전
        /// </summary>
        [DataMember]
        public string Version { get; set; } = "";
        /// <summary>
        /// 요청자 PC OS
        /// </summary>
        [DataMember]
        public string OS { get; set; } = "";
        /// <summary>
        /// 요청자 IP주소
        /// </summary>
        [DataMember]
        public string IPAddress { get; set; } = "";
        /// <summary>
        /// 요청 사용자ID
        /// </summary>
        [DataMember]
        public string LoginUserId { get; set; } = "";
        /// <summary>
        /// 요청 사용자이름
        /// </summary>
        [DataMember]
        public string LoginUserName { get; set; } = "";

        /// <summary>
        /// 서버 요청 데이터
        /// </summary>
        [DataMember]
        public Dictionary<int, TParameter> Data { get; set; }

        public TRequest()
        {

        }

        /// <summary>
        /// Collection 정리하면서 Index 정리한다.
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        //private static Collection<TParameter> MakeCollection(params TParameter[] para)
        //{
        //    Collection<TParameter> items = new Collection<TParameter>();
        //    int index = 0;
        //    foreach (TParameter p in para)
        //    {
        //        p.Seq = index++;
        //        p.Generate();
        //        items.Add(p);
        //    }
        //    return items;
        //}
        /// <summary>
        /// Collection 정리하면서 Index 정리한다.
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        //private static Collection<TParameter> RebuildCollection(Collection<TParameter> para)
        //{
        //    Collection<TParameter> items = new Collection<TParameter>();
        //    int index = 0;
        //    foreach (TParameter p in para)
        //    {
        //        p.Seq = index++;
        //        p.Generate();
        //        items.Add(p);
        //    }
            
        //    return items;
        //}

        /// <summary>
        /// 기초 메시지 생성
        /// </summary>
        /// <returns></returns>
        //public static TRequest MakeTRequest(string menuId, params TParameter[] para)
        //{
        //    TRequest data = new TRequest();
        //    data.TokenId = LoginUser.Instance.TokenId;
        //    data.ExpiredDateTime = LoginUser.Instance.ExpiredDateTime;
        //    data.ClientId = LoginUser.Instance.MacAddress;
        //    data.CompanyCD = LoginUser.Instance.MOMConfig.COMPANY_CD;
        //    data.DivisionCD = LoginUser.Instance.MOMConfig.DIVISION_CD;
        //    data.Language = LoginUser.Instance.MOMConfig.Language;
        //    data.System = LoginUser.Instance.MOMConfig.System;
        //    data.Version = Environment.Version.ToString();
        //    data.OS = Environment.OSVersion.ToString();
        //    data.IPAddress = LoginUser.Instance.LocalIP;
        //    data.LoginUserId = LoginUser.Instance.MOMConfig.UserId;
        //    data.LoginUserName = LoginUser.Instance.MOMConfig.UserName;
        //    data.MenuId = menuId;

        //    if(para == null) data.Data = new Dictionary<int, TParameter>();
        //    else data.Data = MakeCollection(para).ToDictionary(p => p.Seq);

        //    return data;
        //}
        /// <summary>
        /// 기초 메시지 생성
        /// </summary>
        /// <returns></returns>
        //public static TRequest MakeTRequest(string menuId, Collection<TParameter> para = null)
        //{
        //    TRequest data = new TRequest();
        //    data.TokenId = LoginUser.Instance.TokenId;
        //    data.ExpiredDateTime = LoginUser.Instance.ExpiredDateTime;
        //    data.ClientId = LoginUser.Instance.MacAddress;
        //    data.CompanyCD = LoginUser.Instance.MOMConfig.COMPANY_CD;
        //    data.DivisionCD = LoginUser.Instance.MOMConfig.DIVISION_CD;
        //    data.Language = LoginUser.Instance.MOMConfig.Language;
        //    data.System = LoginUser.Instance.MOMConfig.System;
        //    data.Version = Environment.Version.ToString();
        //    data.OS = Environment.OSVersion.ToString();
        //    data.IPAddress = LoginUser.Instance.LocalIP;
        //    data.LoginUserId = LoginUser.Instance.MOMConfig.UserId;
        //    data.LoginUserName = LoginUser.Instance.MOMConfig.UserName;
        //    data.MenuId = menuId;


        //    if (para == null) data.Data = new Dictionary<int, TParameter>();
        //    else data.Data = RebuildCollection(para).ToDictionary(p => p.Seq);

        //    return data;
        //}
       
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine($"[ MESSAGE   ] ");
            sb.AppendLine($"[ TOKEN     ] { TokenId }");
            sb.AppendLine($"[ EXPIRED   ] { ExpiredDateTime.ToString("yyyy-MM-dd HH:mm:ss") }");
            sb.AppendLine($"[ CLIENT    ] { ClientId }");
            sb.AppendLine($"[ DIVISION  ] { DivisionCD }");
            sb.AppendLine($"[ COMPANY   ] { CompanyCD }");
            sb.AppendLine($"[ MENUID    ] { MenuId }");
            sb.AppendLine($"[ LANGUAGE  ] { Language}");
            sb.AppendLine($"[ SYSTEM    ] { System }");
            sb.AppendLine($"[ VERSION   ] { Version }");
            sb.AppendLine($"[ OS        ] { OS }");
            sb.AppendLine($"[ IP        ] { IPAddress }");
            sb.AppendLine($"[ LOGINUSERID   ] { LoginUserId }");
            sb.AppendLine($"[ LOGINUSERNAME ] { LoginUserName }");
            sb.AppendLine("[DATALIST]");
            if (Data != null)
            {
                for (int row = 0; row < Data.Count; row++)
                {
                    foreach (TParameterItem para in Data[row])
                    {
                        sb.AppendLine($"- { row } [ { para.DataType } ]{ para.ColumnId }:{ para.ColumnData }");
                    }
                }
            }
            return sb.ToString();
        }
    }
}