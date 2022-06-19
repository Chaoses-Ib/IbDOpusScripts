' 阿拉伯数字转中文数字-WSQL（数字改中文）
' 作者：WSQL
' 版本：220619
' 主页：https://github.com/Chaoses-Ib/IbDOpusScripts

Function OnGetNewName(ByRef getNewNameData)
    Set Item = getNewNameData.Item
    '正则表达式判断
    Dim Reg
    Set Reg = CreateObject("vbscript.regexp")
    Reg.Pattern = "(\d{1,})" '正则表达式
    Reg.Global = True '匹配所有项
    Set Match = Reg.Execute(Item.name_stem)
    '当匹配数>=1时就改名
    Dim NewName
    NewName = Item.name_stem
    If Match.Count >= 1 Then
        For Each M In Match    '遍历所有匹配对象
            
            NewName = Replace(NewName, M.SubMatches(0), NumToChinese(M.SubMatches(0), getNewNameData.custom.my_option))
        Next
        OnGetNewName = NewName & Item.ext
    Else
        OnGetNewName = True
    End If
End Function


'数字转中文函数
Function NumToChinese(StrEng, my_option)
    Dim intLen, intCounter, strCh, strTempCh, strSeqCh1, strSeqCh2, strEng2Ch, i
    '去掉前面的0
    For i = 1 To Len(StrEng) - 1
        If Mid(StrEng, i, 1) = "0" Then
            StrEng = Right(StrEng, Len(StrEng - 1))
        Else
            Exit For
        End If
    Next
    DOpus.Output my_option
    If my_option = -1 Then
        strEng2Ch = "零壹贰叁肆伍陆柒捌玖"
        strSeqCh1 = " 拾佰仟 拾佰仟 拾佰仟 拾佰仟"
        strSeqCh2 = " 万亿兆"
    Else
        strEng2Ch = "零一二三四五六七八九"
        strSeqCh1 = " 十百千 十百千 十百千 十百千"
        strSeqCh2 = " 万亿兆"
    End If
    intLen = Len(StrEng)
    For intCounter = 1 To intLen
        strTempCh = Mid(strEng2Ch, CInt(Mid(StrEng, intCounter, 1)) + 1, 1)
        If strTempCh = "零" And intLen <> 1 Then
            If Mid(StrEng, intCounter + 1, 1) = "0" Or (intLen - intCounter + 1) Mod 4 = 1 Then
                strTempCh = ""
            End If
        Else
            strTempCh = strTempCh & Trim(Mid(strSeqCh1, intLen - intCounter + 1, 1))
        End If
        If (intLen - intCounter + 1) Mod 4 = 1 Then
            strTempCh = strTempCh & Mid(strSeqCh2, (intLen - intCounter + 1) \ 4 + 1, 1)
            If intCounter > 3 Then
                If Mid(StrEng, intCounter - 3, 4) = "0000" Then strTempCh = Left(strTempCh, Len(strTempCh) - 1)
            End If
        End If
        strCh = strCh & Trim(strTempCh)
    Next
    NumToChinese = strCh
End Function
'增加是否转换成大写的选项
Function OnGetCustomFields(ByRef getFieldData)
    getFieldData.Fields.my_option = False
    getFieldData.field_labels("my_option") = "是否转换成大写数字，大写：壹佰贰拾伍，小写：一百二十五"
End Function

